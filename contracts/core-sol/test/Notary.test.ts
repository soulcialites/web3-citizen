import { ethers } from 'hardhat';
import { expect } from 'chai';
import { constants, Contract, ContractFactory, utils } from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
const { getSigners } = ethers;

describe('Notary', () => {
  let wallet0: SignerWithAddress;
  let wallet1: SignerWithAddress;
  let CitizenAlpha: Contract;
  let CitizenAlphaFactory: ContractFactory;
  let Notary: Contract;
  let NotaryFactory: ContractFactory;

  const FOUNDER = utils.keccak256(utils.toUtf8Bytes('FOUNDER'));
  const NOTARY = utils.keccak256(utils.toUtf8Bytes('NOTARY'));

  before(async () => {
    [wallet0, wallet1] = await getSigners();
    CitizenAlphaFactory = await ethers.getContractFactory('CitizenAlpha');
    NotaryFactory = await ethers.getContractFactory('Notary');
  });

  beforeEach(async () => {
    CitizenAlpha = await CitizenAlphaFactory.deploy(constants.AddressZero, 'Web5 Citizen', 'CI5');
    Notary = await NotaryFactory.deploy(CitizenAlpha.address, [wallet0.address]);
    CitizenAlpha.setNotary(Notary.address);
  });

  /* ================================================================================ */
  /* READ                                                                             */
  /* ================================================================================ */
  describe('READ', () => {
    describe('hasRole(bytes32 role, address account)', () => {
      it('should SUCCEED to validate FOUNDER role for a non-Founder', async () => {
        await Notary.issue(wallet1.address);
        expect(await Notary.hasRole(FOUNDER, wallet1.address)).to.eq(false);
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
        await Notary.issue(wallet1.address);
        expect(await CitizenAlpha.isCitizen(wallet1.address)).to.be.equal(true);
      });

      it('should REVERT due to UNAUTHORIZED access', async () => {
        await expect(Notary.connect(wallet1).issue(wallet1.address)).to.be.revertedWith(
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
      it('should SUCCEED to revoke TOKEN from existing Citizen', async () => {
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
  });
});
