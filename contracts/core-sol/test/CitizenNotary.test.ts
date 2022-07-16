import { ethers } from 'hardhat';
import { expect } from 'chai';
import { constants, Contract, ContractFactory, utils } from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
const { getSigners } = ethers;

describe('CitizenNotary', () => {
  let wallet0: SignerWithAddress;
  let wallet1: SignerWithAddress;
  let CitizenAlpha: Contract;
  let CitizenAlphaFactory: ContractFactory;
  let CitizenNotary: Contract;
  let CitizenNotaryFactory: ContractFactory;

  const FOUNDER = utils.keccak256(utils.toUtf8Bytes('FOUNDER'));
  const NOTARY = utils.keccak256(utils.toUtf8Bytes('NOTARY'));
  const INVALID_ROLE = utils.keccak256(utils.toUtf8Bytes('INVALID_ROLE'));

  before(async () => {
    [wallet0, wallet1] = await getSigners();
    CitizenAlphaFactory = await ethers.getContractFactory('CitizenAlpha');
    CitizenNotaryFactory = await ethers.getContractFactory('CitizenNotary');
  });

  beforeEach(async () => {
    CitizenAlpha = await CitizenAlphaFactory.deploy(constants.AddressZero, 'Web5 Citizen', 'CI5');
    CitizenNotary = await CitizenNotaryFactory.deploy(CitizenAlpha.address, [wallet0.address]);
    CitizenAlpha.setNotary(CitizenNotary.address);
  });

  /* ================================================================================ */
  /* READ                                                                             */
  /* ================================================================================ */
  describe('READ', () => {
    describe('isRole(bytes32 role)', () => {
      it('should SUCCEED to validate NOTARY role is active for Founder', async () => {
        expect(await CitizenNotary.isRole(NOTARY)).to.eq(true);
      });

      it('should SUCCEED to validate FOUNDER role is active for Founder', async () => {
        expect(await CitizenNotary.isRole(FOUNDER)).to.eq(true);
      });

      it('should SUCCEED to validate INVALID_ROLE role is NOT active for Founder', async () => {
        expect(await CitizenNotary.isRole(INVALID_ROLE)).to.eq(false);
      });
    });

    describe('hasRole(bytes32 role, address account)', () => {
      it('should SUCCEED to validate FOUNDER role for a non-Founder', async () => {
        await CitizenNotary.issue(wallet1.address);
        expect(await CitizenNotary.hasRole(FOUNDER, wallet1.address)).to.eq(false);
      });

      it('should SUCCEED to validate DEFAULT role for a starting Founder', async () => {
        expect(
          await CitizenNotary.hasRole(await CitizenNotary.DEFAULT_ADMIN_ROLE(), wallet0.address),
        ).to.eq(true);
      });

      it('should SUCCEED to validate FOUNDER role for a starting Founder', async () => {
        expect(await CitizenNotary.hasRole(FOUNDER, wallet0.address)).to.eq(true);
      });

      it('should SUCCEED to validate FOUNDER role for a new Founder', async () => {
        await CitizenNotary.issue(wallet1.address);
        await CitizenNotary.grantRole(FOUNDER, wallet1.address);
        expect(await CitizenNotary.hasRole(FOUNDER, wallet1.address)).to.eq(true);
      });

      it('should SUCCEED to invalidate FOUNDER role via GLOBAL access control', async () => {
        await CitizenNotary.issue(wallet0.address);
        await CitizenNotary.grantRole(FOUNDER, wallet1.address);
        await CitizenNotary.toggleRole(FOUNDER);
        expect(await CitizenNotary.hasRole(FOUNDER, wallet0.address)).to.eq(false);
      });
    });
  });

  /* ================================================================================ */
  /* WRITE                                                                            */
  /* ================================================================================ */
  describe('WRITE', () => {
    /**
     * -= Expected Behavior =-
     * 1. require authorization via Citizen role
     * 2. issue new Citizen token
     * 3. emit Issued event
     *
     * signature: issue(address to)
     */
    describe('issue(address to)', () => {
      it('should SUCCEED to issue TOKEN from existing Citizen', async () => {
        await CitizenNotary.issue(wallet1.address);
        expect(await CitizenNotary.isCitizen(wallet1.address)).to.be.equal(true);
      });

      it('should REVERT due to UNAUTHORIZED access', async () => {
        await expect(CitizenNotary.connect(wallet1).issue(wallet1.address)).to.be.revertedWith(
          'CitizenNotary:unauthorized-access',
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
      it('should SUCCEED to revoke TOKEN from existing Citizen', async () => {
        await CitizenNotary.issue(wallet1.address);
        expect(await CitizenNotary.isCitizen(wallet1.address)).to.be.equal(true);
        await CitizenNotary.revoke(wallet1.address);
        expect(await CitizenNotary.isCitizen(wallet1.address)).to.be.equal(false);
      });

      it('should REVERT due to UNAUTHORIZED access', async () => {
        await expect(CitizenNotary.connect(wallet1).revoke(wallet1.address)).to.be.revertedWith(
          'CitizenNotary:unauthorized-access',
        );
      });
    });
  });
});
