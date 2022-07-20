import { artifacts, ethers } from 'hardhat';
import { expect } from 'chai';
import { deployMockContract, MockContract } from 'ethereum-waffle';
import { constants, Contract, ContractFactory, utils } from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
const { getSigners } = ethers;

describe('CitizenAlpha', () => {
  let wallet0: SignerWithAddress;
  let wallet1: SignerWithAddress;
  let CitizenAlpha: Contract;
  let CitizenAlphaFactory: ContractFactory;
  let MetadataMock: MockContract;
  let NationMock: MockContract;
  let NotaryMock: MockContract;
  const FOUNDER = utils.keccak256(utils.toUtf8Bytes('FOUNDER'));
  before(async () => {
    [wallet0, wallet1] = await getSigners();
    CitizenAlphaFactory = await ethers.getContractFactory('CitizenAlpha');
    let MetadataMockArtifact = await artifacts.readArtifact('Metadata');
    MetadataMock = await deployMockContract(wallet1, MetadataMockArtifact.abi);
    let NationMockArtifact = await artifacts.readArtifact('Nation');
    NationMock = await deployMockContract(wallet1, NationMockArtifact.abi);
    let NotaryMockMockArtifact = await artifacts.readArtifact('Notary');
    NotaryMock = await deployMockContract(wallet1, NotaryMockMockArtifact.abi);
    await MetadataMock.mock.tokenURI.returns('tokenURI');
    await MetadataMock.mock.tokenURIResolver.returns('tokenURIResolver');
  });

  beforeEach(async () => {
    CitizenAlpha = await CitizenAlphaFactory.deploy(MetadataMock.address, 'Web5 Citizen', 'CI5');
    await CitizenAlpha.setNation(NationMock.address);
    await CitizenAlpha.setNotary(NotaryMock.address);
    await NationMock.mock.hasRole.withArgs(FOUNDER, wallet0.address).returns(true);
    await NotaryMock.mock.isNotary.withArgs(wallet0.address).returns(true);
    await NotaryMock.mock.isNotary.withArgs(wallet1.address).returns(false);
  });

  /* ================================================================================ */
  /* READ                                                                             */
  /* ================================================================================ */
  describe('READ', () => {
    it('getMetadata()', async () => {
      expect(await CitizenAlpha.getMetadata()).to.eq(MetadataMock.address);
    });
    it('getNation()', async () => {
      expect(await CitizenAlpha.getNation()).to.eq(NationMock.address);
    });
    it('getNotary()', async () => {
      expect(await CitizenAlpha.getNotary()).to.eq(NotaryMock.address);
    });

    it('totalIssued()', async () => {
      expect(await CitizenAlpha.totalIssued()).to.eq(0);
      await CitizenAlpha.issue(wallet1.address);
      expect(await CitizenAlpha.totalIssued()).to.eq(1);
    });

    describe('hasRole(address citizen)', () => {
      it('should SUCCEED to get the FOUNDER role for Citizen', async () => {
        expect(await CitizenAlpha.hasRole(FOUNDER, wallet0.address)).to.eq(true);
      });
    });

    describe('getId(address citizen)', () => {
      it('should SUCCEED to get the ID for Citizen', async () => {
        await CitizenAlpha.issue(wallet1.address);
        expect(await CitizenAlpha.getId(wallet1.address)).to.eq(0);
      });

      it('should REVERT because of NON-EXISTING citizen', async () => {
        await expect(CitizenAlpha.getId(wallet1.address)).to.be.revertedWith(
          'CitizenAlpha:not-active-citizen',
        );
      });
    });

    describe('getLink(address citizen)', () => {
      it('should SUCCEED to get link for a starting FOUNDER', async () => {
        await CitizenAlpha.issue(wallet1.address);
        expect(await CitizenAlpha.getLink(wallet1.address)).to.eq(wallet0.address);
      });

      it('should SUCCEED to get link for Citizen', async () => {
        await CitizenAlpha.issue(wallet1.address);
        expect(await CitizenAlpha.getLink(wallet1.address)).to.eq(wallet0.address);
      });
    });

    describe('isCitizen(address citizen)', () => {
      it('should SUCCEED to check status for EXISTING citizen', async () => {
        await CitizenAlpha.issue(wallet1.address);
        expect(await CitizenAlpha.isCitizen(wallet1.address)).to.eq(true);
      });

      it('should SUCCEED to check status for NON-EXISTING citizen', async () => {
        expect(await CitizenAlpha.isCitizen(wallet1.address)).to.eq(false);
      });
    });

    describe('tokenURI(uint256 tokenId)', () => {
      it('should SUCCEED to fetch the standard token URI', async () => {
        await CitizenAlpha.issue(wallet1.address);
        expect(await CitizenAlpha.tokenURI(0)).to.eq('tokenURI');
      });

      it('should SUCCEED to fetch the minimal token URI after enabling tokenURISplitter', async () => {
        await CitizenAlpha.issue(wallet1.address);
        const TrustResolverFactory = await ethers.getContractFactory('TrustResolver');
        const TrustResolver = await TrustResolverFactory.deploy(
          CitizenAlpha.address,
          MetadataMock.address,
          constants.AddressZero,
        );
        CitizenAlpha.setResolver(TrustResolver.address);
        expect(await CitizenAlpha.tokenURI(0)).to.eq('tokenURI');
        expect(await TrustResolver.tokenURI(0)).to.eq('tokenURI');
      });

      it('should SUCCEED to fetch the standard token URI after enabling tokenURISplitter', async () => {
        await CitizenAlpha.issue(wallet1.address);
        const TrustResolverFactory = await ethers.getContractFactory('TrustResolver');
        const TrustResolver = await TrustResolverFactory.deploy(
          CitizenAlpha.address,
          MetadataMock.address,
          constants.AddressZero,
        );
        CitizenAlpha.setResolver(TrustResolver.address);
        await CitizenAlpha.setURISplitter(true);
        expect(await CitizenAlpha.tokenURI(0)).to.eq('tokenURI');
        expect(await TrustResolver.tokenURI(0)).to.eq('tokenURIResolver');
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
          .withArgs('0', wallet1.address, wallet0.address);
      });

      it('should REVERT because Citizenship is active', async () => {
        await CitizenAlpha.issue(wallet1.address);
        await expect(CitizenAlpha.issue(wallet1.address)).to.be.revertedWith(
          'CitizenAlpha:is-citizen',
        );
      });

      it('should REVERT because Citizenship is previously revoked', async () => {
        await CitizenAlpha.issue(wallet0.address);
        await CitizenAlpha.issue(wallet1.address);
        await CitizenAlpha.revoke(wallet1.address);
        await expect(CitizenAlpha.issue(wallet1.address)).to.be.revertedWith(
          'CitizenAlpha:revoked-citizenship',
        );
      });

      it('should REVERT due to UNAUTHORIZED access', async () => {
        await expect(CitizenAlpha.connect(wallet1).issue(wallet1.address)).to.be.revertedWith(
          'CitizenAlpha:not-notary',
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
          .withArgs('0', wallet1.address, wallet0.address);
      });

      it('should REVERT because Citizenship is not issued', async () => {
        await expect(CitizenAlpha.revoke(wallet1.address)).to.be.revertedWith(
          'CitizenAlpha:not-citizen',
        );
      });

      it('should REVERT due to UNAUTHORIZED access', async () => {
        await expect(CitizenAlpha.connect(wallet1).revoke(wallet1.address)).to.be.revertedWith(
          'CitizenAlpha:not-notary',
        );
      });
    });

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
          .withArgs('0', wallet1.address, wallet0.address);
      });

      it('should REVERT because Citizenship is not issued', async () => {
        await expect(CitizenAlpha.revoke(wallet1.address)).to.be.revertedWith(
          'CitizenAlpha:not-citizen',
        );
      });

      it('should REVERT due to UNAUTHORIZED access', async () => {
        await expect(CitizenAlpha.connect(wallet1).revoke(wallet1.address)).to.be.revertedWith(
          'CitizenAlpha:not-notary',
        );
      });
    });
  });
});
