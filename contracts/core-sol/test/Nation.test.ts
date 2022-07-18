import { ethers } from 'hardhat';
import { expect } from 'chai';
import { constants, Contract, ContractFactory, utils } from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
const { getSigners } = ethers;

describe('Nation', () => {
  let wallet0: SignerWithAddress;
  let wallet1: SignerWithAddress;
  let CitizenAlpha: Contract;
  let CitizenAlphaFactory: ContractFactory;
  let Nation: Contract;
  let NationFactory: ContractFactory;

  const FOUNDER = utils.keccak256(utils.toUtf8Bytes('FOUNDER'));
  const NOTARY = utils.keccak256(utils.toUtf8Bytes('NOTARY'));
  const INVALID_ROLE = utils.keccak256(utils.toUtf8Bytes('INVALID_ROLE'));

  before(async () => {
    [wallet0, wallet1] = await getSigners();
    CitizenAlphaFactory = await ethers.getContractFactory('CitizenAlpha');
    NationFactory = await ethers.getContractFactory('Nation');
  });

  beforeEach(async () => {
    CitizenAlpha = await CitizenAlphaFactory.deploy(constants.AddressZero, 'Web5 Citizen', 'CI5');
    Nation = await NationFactory.deploy(CitizenAlpha.address, [wallet0.address]);
    CitizenAlpha.setNotary(Nation.address);
  });

  /* ================================================================================ */
  /* READ                                                                             */
  /* ================================================================================ */
  describe('READ', () => {
    describe('isRole(bytes32 role)', () => {
      it('should SUCCEED to validate FOUNDER role is active for Founder', async () => {
        expect(await Nation.isRole(FOUNDER)).to.eq(true);
      });

      it('should SUCCEED to validate INVALID_ROLE role is NOT active for Founder', async () => {
        expect(await Nation.isRole(INVALID_ROLE)).to.eq(false);
      });
    });

    describe('hasRole(bytes32 role, address account)', () => {
      it('should SUCCEED to validate FOUNDER role for a non-Founder', async () => {
        expect(await Nation.hasRole(FOUNDER, wallet1.address)).to.eq(false);
      });

      it('should SUCCEED to validate DEFAULT role for a starting Founder', async () => {
        expect(await Nation.hasRole(await Nation.DEFAULT_ADMIN_ROLE(), wallet0.address)).to.eq(
          true,
        );
      });

      it('should SUCCEED to validate FOUNDER role for a starting Founder', async () => {
        expect(await Nation.hasRole(FOUNDER, wallet0.address)).to.eq(true);
      });

      it('should SUCCEED to validate FOUNDER role for a new Founder', async () => {
        await Nation.grantRole(FOUNDER, wallet1.address);
        expect(await Nation.hasRole(FOUNDER, wallet1.address)).to.eq(true);
      });

      it('should SUCCEED to invalidate FOUNDER role via GLOBAL access control', async () => {
        await Nation.grantRole(FOUNDER, wallet1.address);
        await Nation.disableRole(FOUNDER);
        expect(await Nation.hasRole(FOUNDER, wallet0.address)).to.eq(false);
      });
    });
  });

  /* ================================================================================ */
  /* WRITE                                                                            */
  /* ================================================================================ */
  describe('WRITE', () => {});
});
