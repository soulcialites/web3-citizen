import { ethers } from 'hardhat';
import { expect } from 'chai';
import { constants, Contract, ContractFactory, utils } from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
const { getSigners } = ethers;

describe('Notary', () => {
  let wallet0: SignerWithAddress;
  let wallet1: SignerWithAddress;
  let wallet2: SignerWithAddress;
  let CitizenAlpha: Contract;
  let CitizenAlphaFactory: ContractFactory;
  let Notary: Contract;
  let NotaryFactory: ContractFactory;

  const NOTARY = utils.keccak256(utils.toUtf8Bytes('NOTARY'));

  before(async () => {
    [wallet0, wallet1, wallet2] = await getSigners();
    CitizenAlphaFactory = await ethers.getContractFactory('CitizenAlpha');
    NotaryFactory = await ethers.getContractFactory('Notary');
  });

  beforeEach(async () => {
    CitizenAlpha = await CitizenAlphaFactory.deploy(constants.AddressZero, 'Web5 Citizen', 'CI5');
    Notary = await NotaryFactory.deploy(CitizenAlpha.address, [wallet0.address]);
    await CitizenAlpha.setNotary(Notary.address);
  });

  /* ================================================================================ */
  /* READ                                                                             */
  /* ================================================================================ */
  describe('READ', () => {
    describe('hasRole(bytes32 role, address account)', () => {
      it('should SUCCEED to validate NOTARY role for a Notary', async () => {
        expect(await Notary.hasRole(NOTARY, wallet0.address)).to.eq(true);
      });
      it('should SUCCEED to validate NOTARY role for a NON-Notary', async () => {
        expect(await Notary.hasRole(NOTARY, wallet1.address)).to.eq(false);
      });
    });

    describe('isNotary(address account)', () => {
      it('should SUCCEED to validate NOTARY role for a Notary', async () => {
        expect(await Notary.isNotary(wallet0.address)).to.eq(true);
      });
      it('should SUCCEED to validate NOTARY role for a NON-Notary', async () => {
        expect(await Notary.isNotary(wallet1.address)).to.eq(false);
      });
    });
  });

  /* ================================================================================ */
  /* WRITE                                                                            */
  /* ================================================================================ */
  describe('WRITE', () => {
    describe('issue(address to)', () => {
      it('should SUCCEED to issue Citizenship from authorized Notary', async () => {
        await Notary.issue(wallet1.address);
        expect(await CitizenAlpha.isCitizen(wallet1.address)).to.be.equal(true);
      });

      it('should REVERT due to UNAUTHORIZED access', async () => {
        await expect(Notary.connect(wallet1).revoke(wallet1.address)).to.be.revertedWith(
          'Notary:unauthorized-access',
        );
      });
    });

    describe('issueBatch(address[] to)', () => {
      it('should SUCCEED to issue Citizenship from authorized Notary', async () => {
        await Notary.issueBatch([wallet1.address, wallet2.address]);
        expect(await CitizenAlpha.isCitizen(wallet1.address)).to.be.equal(true);
        expect(await CitizenAlpha.isCitizen(wallet2.address)).to.be.equal(true);
      });

      it('should REVERT due to UNAUTHORIZED access', async () => {
        await expect(Notary.connect(wallet1).revoke(wallet1.address)).to.be.revertedWith(
          'Notary:unauthorized-access',
        );
      });
    });

    /**
     * -= Expected Behavior =-
     * 1. require authorization via Citizen role
     * 2. revoke existing Citizen token
     * 3. emit Revoked event
     *
     * signature: revoke(uint256 tokenId)
     */
    describe('revoke(uint256 tokenId)', () => {
      it('should SUCCEED to revoke Citizenship from authorized Notary', async () => {
        await Notary.issue(wallet1.address);
        expect(await CitizenAlpha.isCitizen(wallet1.address)).to.be.equal(true);
        await Notary.revoke(wallet1.address);
        expect(await CitizenAlpha.isCitizen(wallet1.address)).to.be.equal(false);
      });

      it('should REVERT due to UNAUTHORIZED access', async () => {
        await expect(Notary.connect(wallet1).revoke(wallet1.address)).to.be.revertedWith(
          'Notary:unauthorized-access',
        );
      });
    });

    describe('revokeBatch(address[] to)', () => {
      it('should SUCCEED to issue Citizenship from authorized Notary', async () => {
        await Notary.issueBatch([wallet1.address, wallet2.address]);
        await Notary.revokeBatch([wallet1.address, wallet2.address]);
        expect(await CitizenAlpha.isCitizen(wallet1.address)).to.be.equal(false);
        expect(await CitizenAlpha.isCitizen(wallet2.address)).to.be.equal(false);
      });

      it('should REVERT due to UNAUTHORIZED access', async () => {
        await expect(Notary.connect(wallet1).revoke(wallet1.address)).to.be.revertedWith(
          'Notary:unauthorized-access',
        );
      });
    });
  });
});
