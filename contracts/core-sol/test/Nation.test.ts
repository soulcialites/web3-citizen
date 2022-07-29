import { artifacts, ethers } from 'hardhat';
import { expect } from 'chai';
import { deployMockContract, MockContract } from 'ethereum-waffle';
import { constants, Contract, ContractFactory, utils } from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
const { getSigners } = ethers;

describe('Nation', () => {
  let wallet0: SignerWithAddress;
  let wallet1: SignerWithAddress;
  let wallet2: SignerWithAddress;
  let CitizenAlpha: Contract;
  let CitizenAlphaFactory: ContractFactory;
  let Nation: Contract;
  let NationFactory: ContractFactory;
  let NotaryMock: MockContract;

  const FOUNDER = utils.keccak256(utils.toUtf8Bytes('FOUNDER'));
  const GOVERNANCE = utils.keccak256(utils.toUtf8Bytes('GOVERNANCE'));
  const INVALID_ROLE = utils.keccak256(utils.toUtf8Bytes('INVALID_ROLE'));

  before(async () => {
    [wallet0, wallet1, wallet2] = await getSigners();
    CitizenAlphaFactory = await ethers.getContractFactory('CitizenAlpha');
    NationFactory = await ethers.getContractFactory('Nation');
    let NotaryMockMockArtifact = await artifacts.readArtifact('Notary');
    NotaryMock = await deployMockContract(wallet1, NotaryMockMockArtifact.abi);
  });

  beforeEach(async () => {
    CitizenAlpha = await CitizenAlphaFactory.deploy(constants.AddressZero, 'Web5 Citizen', 'CI5');
    Nation = await NationFactory.deploy("USA", "US", CitizenAlpha.address, [wallet0.address]);
    await CitizenAlpha.setNotary(NotaryMock.address);
    await NotaryMock.mock.isNotary.withArgs(wallet0.address).returns(true);
    await CitizenAlpha.issue(wallet0.address);
    await CitizenAlpha.issue(wallet1.address);
  });

  /* ================================================================================ */
  /* MODIFIERS                                                                        */
  /* ================================================================================ */
  describe('MODIFIERS', () => {
    describe('_onlyAdmin(bytes32 role)', () => {
      it('should SUCCEED to PASS require statement BECAUSE is ROlE ADMIN', async () => {
        const ROLE1 = utils.keccak256(utils.toUtf8Bytes('ROLE1'));
        const ROLE2 = utils.keccak256(utils.toUtf8Bytes('ROLE2'));
        await Nation.enableRoleWithAdmin(ROLE1, FOUNDER);
        await Nation.enableRoleWithAdmin(ROLE2, ROLE1);
        await Nation.grantRole(ROLE1, wallet1.address);
        await Nation.connect(wallet1).grantRole(ROLE2, wallet1.address);
        expect(await Nation.hasRole(ROLE2, wallet1.address)).to.eq(true);
      });

      it('should SUCCEED to PASS require statement BECAUSE is ROlE GOVERNANCE', async () => {
        const ROLE1 = utils.keccak256(utils.toUtf8Bytes('ROLE1'));
        await Nation.enableRoleWithAdmin(ROLE1, FOUNDER);
        await Nation.grantRole(GOVERNANCE, wallet2.address);
        await CitizenAlpha.issue(wallet2.address);
        await Nation.connect(wallet2).grantRole(ROLE1, wallet1.address);
        expect(await Nation.hasRole(ROLE1, wallet1.address)).to.eq(true);
      });

      it('should SUCCEED to PASS require statement BECAUSE is ROlE DEFAULT_ADMIN', async () => {
        await Nation.renounceRole(FOUNDER, wallet0.address);
        await Nation.grantRole(FOUNDER, wallet1.address);
        expect(await Nation.hasRole(FOUNDER, wallet1.address)).to.eq(true);
      });

      it('should FAIL to grant ROLE because UNAUTHORIZED', async () => {
        await expect(
          Nation.connect(wallet1).grantRole(FOUNDER, wallet1.address),
        ).to.be.revertedWith('Nation:unauthorized');
      });
    });
  });

  /* ================================================================================ */
  /* READ                                                                             */
  /* ================================================================================ */
  describe('READ', () => {
    describe('hasRole(bytes32 role, address account)', () => {
      it('should SUCCEED to validate ANY role for NON-CITIZEN', async () => {
        await Nation.grantRole(FOUNDER, wallet2.address);
        expect(await Nation.hasRole(FOUNDER, wallet2.address)).to.eq(false);
      });

      it('should SUCCEED to validate INACTIVE role for CITIZEN', async () => {
        await Nation.enableRole(INVALID_ROLE);
        await Nation.grantRole(INVALID_ROLE, wallet1.address);
        await Nation.disableRole(INVALID_ROLE);
        expect(await Nation.hasRole(INVALID_ROLE, wallet1.address)).to.eq(false);
      });

      it('should SUCCEED to validate ADMIN role for NON-ADMIN', async () => {
        expect(await Nation.hasRole(await Nation.DEFAULT_ADMIN_ROLE(), wallet1.address)).to.eq(
          false,
        );
      });

      it('should SUCCEED to validate FOUNDER role for NON-FOUNDER', async () => {
        expect(await Nation.hasRole(FOUNDER, wallet1.address)).to.eq(false);
      });

      it('should SUCCEED to validate ADMIN role for ADMIN', async () => {
        expect(await Nation.hasRole(await Nation.DEFAULT_ADMIN_ROLE(), wallet0.address)).to.eq(
          true,
        );
      });

      it('should SUCCEED to validate FOUNDER role for FOUNDER', async () => {
        expect(await Nation.hasRole(FOUNDER, wallet0.address)).to.eq(true);
      });

      it('should SUCCEED to invalidate FOUNDER role via GLOBAL AccessControl', async () => {
        await Nation.grantRole(FOUNDER, wallet1.address);
        await Nation.disableRole(FOUNDER);
        expect(await Nation.hasRole(FOUNDER, wallet0.address)).to.eq(false);
      });
    });

    describe('roleStatus(bytes32 role)', () => {
      it('should SUCCEED to validate FOUNDER role is active for Founder', async () => {
        expect(await Nation.roleStatus(FOUNDER)).to.eq(true);
      });

      it('should SUCCEED to validate INVALID_ROLE role is NOT active for Founder', async () => {
        expect(await Nation.roleStatus(INVALID_ROLE)).to.eq(false);
      });
    });
  });

  /* ================================================================================ */
  /* WRITE                                                                            */
  /* ================================================================================ */
  describe('WRITE', () => {
    describe('enableRole(bytes32 role', () => {
      it('should SUCCEED to enable ROLE from FOUNDER account', async () => {
        const ROLE1 = utils.keccak256(utils.toUtf8Bytes('ROLE1'));
        await Nation.enableRole(ROLE1);
        expect(await Nation.roleStatus(ROLE1)).to.eq(true);
        expect(await Nation.getRoleAdmin(ROLE1)).to.eq(FOUNDER);
      });

      it('should FAIL to grant ROLE because UNAUTHORIZED', async () => {
        const ROLE1 = utils.keccak256(utils.toUtf8Bytes('ROLE1'));
        await expect(Nation.connect(wallet1).enableRole(ROLE1)).to.be.revertedWith(
          'AccessControl: account 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 is missing role 0x75c8926d5f068ebc530646119a6c8b65785c321705e3a39f3f7898e9030b9c80',
        );
      });
    });

    describe('disableRole(bytes32 role', () => {
      it('should SUCCEED to disable ROLE', async () => {
        const ROLE1 = utils.keccak256(utils.toUtf8Bytes('ROLE1'));
        await Nation.enableRole(ROLE1);
        await Nation.disableRole(ROLE1);
        expect(await Nation.roleStatus(ROLE1)).to.eq(false);
      });

      it('should FAIL to grant ROLE because UNAUTHORIZED', async () => {
        const ROLE1 = utils.keccak256(utils.toUtf8Bytes('ROLE1'));
        await expect(Nation.connect(wallet1).disableRole(ROLE1)).to.be.revertedWith(
          'Nation:unauthorized',
        );
      });
    });

    describe('grantRole(bytes32 role, address citizen)', () => {
      it('should SUCCEED to grant ROLE to Citizen', async () => {
        expect(await Nation.hasRole(FOUNDER, wallet1.address)).to.eq(false);
        await Nation.grantRole(FOUNDER, wallet1.address);
        expect(await Nation.hasRole(FOUNDER, wallet1.address)).to.eq(true);
      });

      it('should FAIL to grant ROLE because UNAUTHORIZED', async () => {
        await expect(
          Nation.connect(wallet1).grantRole(FOUNDER, wallet1.address),
        ).to.be.revertedWith('Nation:unauthorized');
      });
    });

    describe('revokeRole(bytes32 role, address citizen)', () => {
      it('should SUCCEED to revoke ROLE from Citizen', async () => {
        expect(await Nation.hasRole(FOUNDER, wallet1.address)).to.eq(false);
        await Nation.grantRole(FOUNDER, wallet1.address);
        await Nation.revokeRole(FOUNDER, wallet1.address);
        expect(await Nation.hasRole(FOUNDER, wallet1.address)).to.eq(false);
      });
      it('should FAIL to revoke ROLE because UNAUTHORIZED', async () => {
        await expect(
          Nation.connect(wallet1).revokeRole(FOUNDER, wallet1.address),
        ).to.be.revertedWith('Nation:unauthorized');
      });
    });
  });
});
