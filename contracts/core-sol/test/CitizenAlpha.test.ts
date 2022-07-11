import { ethers } from 'hardhat';
import { expect } from 'chai';
import { Contract, ContractFactory } from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
const { getSigners } = ethers;

describe('CitizenAlpha', () => {
  let wallet0: SignerWithAddress;
  let wallet1: SignerWithAddress;
  let CitizenAlpha: Contract;
  let CitizenAlphaFactory: ContractFactory;
  let CitizenAlphaMetadata: Contract;
  let CitizenAlphaMetadataFactory: ContractFactory;
  let SVGColor: Contract;
  let SVGColorFactory: ContractFactory;

  before(async () => {
    [wallet0, wallet1] = await getSigners();
    CitizenAlphaFactory = await ethers.getContractFactory('CitizenAlpha');
    CitizenAlphaMetadataFactory = await ethers.getContractFactory('CitizenAlphaMetadata');
    SVGColorFactory = await ethers.getContractFactory('SVGColor');
  });

  beforeEach(async () => {
    SVGColor = await SVGColorFactory.deploy();
    CitizenAlphaMetadata = await CitizenAlphaMetadataFactory.deploy(SVGColor.address);
    CitizenAlpha = await CitizenAlphaFactory.deploy(CitizenAlphaMetadata.address, [
      wallet0.address,
    ]);
  });

  /* ================================================================================ */
  /* READ                                                                             */
  /* ================================================================================ */
  describe('READ', () => {
    describe('getId(address citizen)', () => {
      it('should SUCCEED to get the ID for the first FOUNDER', async () => {
        expect(await CitizenAlpha.getId(wallet0.address)).to.eq(0);
      });

      it('should SUCCEED to get the ID for the first Citizen', async () => {
        await CitizenAlpha.issue(wallet1.address);
        expect(await CitizenAlpha.getId(wallet1.address)).to.eq(1);
      });

      it('should REVERT because of NON-EXISTING citizen', async () => {
        await expect(CitizenAlpha.getId(wallet1.address)).to.be.revertedWith(
          'CitizenAlpha:not-active-citizen',
        );
      });
    });

    describe('isCitizen(address citizen)', () => {
      it('should SUCCEED to check status for EXISTING citizen', async () => {
        expect(await CitizenAlpha.isCitizen(wallet0.address)).to.eq(true);
      });

      it('should SUCCEED to check status for NON-EXISTING citizen', async () => {
        expect(await CitizenAlpha.isCitizen(wallet1.address)).to.eq(false);
      });
    });

    describe('isFounder(address citizen)', () => {
      it('should SUCCEED to check status for EXISTING founder', async () => {
        expect(await CitizenAlpha.isFounder(wallet0.address)).to.eq(true);
      });

      it('should SUCCEED to check status for NON-EXISTING founder', async () => {
        expect(await CitizenAlpha.isFounder(wallet1.address)).to.eq(false);
      });
    });

    describe('getLink(address downstreamlink)', () => {
      it('should SUCCEED to get link for a starting FOUNDER', async () => {
        expect(await CitizenAlpha.getLink(wallet0.address)).to.eq(
          '0x0000000000000000000000000000000000000000',
        );
      });

      it('should SUCCEED to get link for a new Citizen', async () => {
        await CitizenAlpha.issue(wallet1.address);
        expect(await CitizenAlpha.getLink(wallet1.address)).to.eq(wallet0.address);
      });
    });
  });

  /* ================================================================================ */
  /* WRITE                                                                            */
  /* ================================================================================ */
  describe('WRITE', () => {
    /**
     * -= Expected Behavior =-
     * 1. revert all transferFrom method executions
     *
     * transferFrom(address,address,uint256)
     */
    describe('transferFrom(address,address,uint256)', () => {
      it('should FAIL to transfer soulbound item', async () => {
        await expect(
          CitizenAlpha.transferFrom(wallet0.address, wallet1.address, 0),
        ).to.be.revertedWith('CitizenAlpha: Soulbound');
      });
    });

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
        await CitizenAlpha.issue(wallet1.address);
        expect(await CitizenAlpha.balanceOf(wallet1.address)).to.be.equal(1);
      });

      it('should EMIT Issued(uint256 id, address indexed, address indexed)', async () => {
        await expect(CitizenAlpha.issue(wallet1.address))
          .to.emit(CitizenAlpha, 'Issued')
          .withArgs('1', wallet1.address, wallet0.address);
      });

      it('should REVERT because Citizenship is active', async () => {
        await CitizenAlpha.issue(wallet1.address);
        await expect(CitizenAlpha.issue(wallet1.address)).to.be.revertedWith(
          'CitizenAlpha:active-citizenship',
        );
      });

      it('should REVERT because Citizenship is previously revoked', async () => {
        await CitizenAlpha.issue(wallet1.address);
        await CitizenAlpha.revoke(wallet1.address);
        await expect(CitizenAlpha.issue(wallet1.address)).to.be.revertedWith(
          'CitizenAlpha:revoked-citizenship',
        );
      });

      it('should REVERT due to UNAUTHORIZED access', async () => {
        await expect(CitizenAlpha.connect(wallet1).issue(wallet1.address)).to.be.revertedWith(
          'CitizenAlpha:unauthorized-access',
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
        await CitizenAlpha.issue(wallet1.address);
        expect(await CitizenAlpha.balanceOf(wallet1.address)).to.be.equal(1);
        await CitizenAlpha.revoke(wallet1.address);
        expect(await CitizenAlpha.balanceOf(wallet1.address)).to.be.equal(0);
      });

      it('should EMIT Revoked(uint256 id, address indexed, address indexed) event;', async () => {
        await CitizenAlpha.issue(wallet1.address);
        await expect(CitizenAlpha.revoke(wallet1.address))
          .to.emit(CitizenAlpha, 'Revoked')
          .withArgs('1', wallet1.address, wallet0.address);
      });

      it('should REVERT because Citizenship is not issued', async () => {
        await expect(CitizenAlpha.revoke(wallet1.address)).to.be.revertedWith(
          'CitizenAlpha:not-active-citizen',
        );
      });

      it('should REVERT due to UNAUTHORIZED access', async () => {
        await expect(CitizenAlpha.connect(wallet1).revoke(wallet1.address)).to.be.revertedWith(
          'AccessControl: account 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 is missing role 0x75c8926d5f068ebc530646119a6c8b65785c321705e3a39f3f7898e9030b9c80',
        );
      });
    });

    /**
     * -= Expected Behavior =-
     * 1. require authorization via FOUNDER role
     * 2. add FOUNDER role to existing Citizen
     *
     * signature: addFounder(address citizen)
     */
    describe('addFounder(address citizen)', () => {
      it('should SUCCEED to add FOUNDER', async () => {
        await CitizenAlpha.addFounder(wallet1.address);
        expect(await CitizenAlpha.isFounder(wallet1.address)).to.eq(true);
      });

      it('should REVERT due to UNAUTHORIZED access', async () => {
        await expect(CitizenAlpha.connect(wallet1).addFounder(wallet1.address)).to.be.revertedWith(
          'AccessControl: account 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 is missing role 0x0000000000000000000000000000000000000000000000000000000000000000',
        );
      });
    });

    /**
     * -= Expected Behavior =-
     * 1. require authorization via ADMIN role
     * 2. remove FOUNDER role from Citizen
     *
     * signature: removeFounder(address citizen)
     */
    describe('removeFounder(address citizen)', () => {
      it('should SUCCEED to add FOUNDER', async () => {
        await CitizenAlpha.addFounder(wallet1.address);
        await CitizenAlpha.removeFounder(wallet1.address);
        expect(await CitizenAlpha.isFounder(wallet1.address)).to.eq(false);
      });
    });
  });
});
