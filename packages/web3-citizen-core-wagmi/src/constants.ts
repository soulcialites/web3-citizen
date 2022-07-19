import { utils } from 'ethers';

export const NOTARY = utils.keccak256(utils.toUtf8Bytes('NOTARY'));
export const FOUNDER = utils.keccak256(utils.toUtf8Bytes('FOUNDER'));
export const TREASURY = utils.keccak256(utils.toUtf8Bytes('TREASURY'));
export const LABS = utils.keccak256(utils.toUtf8Bytes('LABS'));

export const lookup = {
  NOTARY: NOTARY,
  FOUNDER: FOUNDER,
  TREASURY: TREASURY,
  LABS: LABS,
};

export const reverseLookup = {
  '0x0000000000000000000000000000000000000000000000000000000000000000': 'ADMIN',
  [NOTARY]: 'NOTARY',
  [FOUNDER]: 'FOUNDER',
  [TREASURY]: 'TREASURY',
  [LABS]: 'LABS',
};

const constants = {
  NOTARY,
  FOUNDER,
};

export default constants;
