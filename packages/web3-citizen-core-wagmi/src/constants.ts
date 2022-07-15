import { utils } from "ethers";

export const NOTARY = utils.keccak256(utils.toUtf8Bytes('NOTARY'))
export const FOUNDER = utils.keccak256(utils.toUtf8Bytes('FOUNDER'))

const constants = {
    NOTARY,
    FOUNDER
}

export default constants