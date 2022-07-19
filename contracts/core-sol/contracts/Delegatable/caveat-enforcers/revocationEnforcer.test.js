const { expect } = require('chai');
const { ethers } = require('hardhat');
const friendlyTypes = require('../../types');
const BigNumber = ethers.BigNumber;
const sigUtil = require('eth-sig-util');
const { TypedDataUtils } = sigUtil;
const { typedSignatureHash, encodeData } = TypedDataUtils;
const { encode } = require('punycode');
const { TIMEOUT } = require('dns');

const types = signTypedDataify(friendlyTypes);
const CONTRACT_NAME = 'PhisherRegistry';
const ownerHexPrivateKey = 'ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
const account1PrivKey = '59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d';
const account2PrivKey = '5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a';

describe('RevocationEnforcer', function () {
  it('non revoked delegation works', async () => {
    const [owner, addr1, addr2, addr3] = await ethers.getSigners();
    const targetString = 'A totally new purpose!';
    const yourContract = await deployContract();
    await yourContract.setPurpose(targetString);

    const caveat = await deployCaveat();

    // Prepare the delegation message:
    // This message has no caveats, and authority 0,
    // so it is a simple delegation to addr1 with no restrictions,
    // and will allow the delegate to perform any action the signer could perform on this contract.
    const delegation = {
      delegate: addr1.address,
      authority: '0x0000000000000000000000000000000000000000000000000000000000000000',
      caveats: [
        {
          enforcer: caveat.address,
        },
      ],
    };
    const typedMessage = createTypedMessage(yourContract, delegation, 'Delegation');

    // Owner signs the delegation:
    const privateKey = fromHexString(ownerHexPrivateKey);
    const signature = sigUtil.signTypedData_v4(privateKey, typedMessage);
    const signedDelegation = {
      signature,
      delegation,
    };

    // Delegate signs the invocation message:
    const desiredTx = await yourContract.populateTransaction.setPurpose(targetString);
    const delegatePrivateKey = fromHexString(account1PrivKey);
    const invocationMessage = {
      replayProtection: {
        nonce: '0x01',
        queue: '0x01',
      },
      batch: [
        {
          authority: [signedDelegation],
          transaction: {
            to: yourContract.address,
            gasLimit: '10000000000000000',
            data: desiredTx.data,
          },
        },
      ],
    };
    const typedInvocationMessage = createTypedMessage(
      yourContract,
      invocationMessage,
      'Invocations',
    );
    const invocationSig = sigUtil.signTypedData_v4(delegatePrivateKey, typedInvocationMessage);
    const signedInvocation = {
      signature: invocationSig,
      invocations: invocationMessage,
    };

    // A third party can submit the invocation method to the chain:
    const res = await yourContract.connect(addr2).invoke([signedInvocation]);

    // Verify the change was made:
    expect(await yourContract.purpose()).to.equal(targetString);
  });

  it('revoked delegation fails', async () => {
    const [owner, addr1, addr2, addr3] = await ethers.getSigners();
    const targetString = 'A totally new purpose!';
    const yourContract = await deployContract();
    await yourContract.setPurpose(targetString);

    const caveat = await deployCaveat();

    // Prepare the delegation message:
    // This message has no caveats, and authority 0,
    // so it is a simple delegation to addr1 with no restrictions,
    // and will allow the delegate to perform any action the signer could perform on this contract.
    const delegation = {
      delegate: addr1.address,
      authority: '0x0000000000000000000000000000000000000000000000000000000000000000',
      caveats: [
        {
          enforcer: caveat.address,
        },
      ],
    };
    const typedMessage = createTypedMessage(yourContract, delegation, 'Delegation');

    // Owner signs the delegation:
    const privateKey = fromHexString(ownerHexPrivateKey);
    const signature = sigUtil.signTypedData_v4(privateKey, typedMessage);
    const signedDelegation = {
      signature,
      delegation,
    };

    // Owner also submits a revocation message:
    await caveat.revoke(signedDelegation);

    // Delegate signs the invocation message:
    const desiredTx = await yourContract.populateTransaction.setPurpose(targetString);
    const delegatePrivateKey = fromHexString(account1PrivKey);
    const invocationMessage = {
      replayProtection: {
        nonce: '0x01',
        queue: '0x01',
      },
      batch: [
        {
          authority: [signedDelegation],
          transaction: {
            to: yourContract.address,
            gasLimit: '10000000000000000',
            data: desiredTx.data,
          },
        },
      ],
    };
    const typedInvocationMessage = createTypedMessage(
      yourContract,
      invocationMessage,
      'Invocations',
    );
    const invocationSig = sigUtil.signTypedData_v4(delegatePrivateKey, typedInvocationMessage);
    const signedInvocation = {
      signature: invocationSig,
      invocations: invocationMessage,
    };

    // A third party can submit the invocation method to the chain:
    try {
      const res = await yourContract.connect(addr2).invoke([signedInvocation]);
    } catch (err) {
      expect(err.message).to.equal('Delegation has been revoked');
    }
  });
});

async function deployContract() {
  const YourContract = await ethers.getContractFactory(CONTRACT_NAME);
  const yourContract = await YourContract.deploy(CONTRACT_NAME);
  return yourContract.deployed();
}

function createTypedMessage(yourContract, message, primaryType) {
  const chainId = yourContract.deployTransaction.chainId;
  return {
    data: {
      types,
      primaryType,
      domain: {
        name: CONTRACT_NAME,
        version: '1',
        chainId,
        verifyingContract: yourContract.address,
      },
      message,
    },
  };
}

function fromHexString(hexString) {
  console.warn('from hex string', hexString);
  return new Uint8Array(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
}

function signTypedDataify(friendlyTypes) {
  const types = {};
  Object.keys(friendlyTypes).forEach((typeName) => {
    const type = friendlyTypes[typeName];
    types[typeName] = [];

    Object.keys(friendlyTypes[typeName]).forEach((subTypeName) => {
      const subType = friendlyTypes[typeName][subTypeName];
      types[typeName].push({
        name: subTypeName,
        type: subType,
      });
    });
  });
  return types;
}

async function deployCaveat() {
  const YourContract = await ethers.getContractFactory('RevocationEnforcer');
  const yourContract = await YourContract.deploy();
  return yourContract.deployed();
}
