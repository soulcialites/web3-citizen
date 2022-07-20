/**
 * Truncates an ethereum address to the format 0x0000…0000
 * @param address Full address to truncate
 * @returns Truncated address
 */
declare const truncateAddress: (address: string) => string;
export default truncateAddress;
