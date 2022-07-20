/// <reference types="react" />
interface ERC20TotalSupplyProps {
    className?: string;
    account?: string;
    contractAddress: string;
}
export declare const ERC20TotalSupply: ({ className, contractAddress, }: ERC20TotalSupplyProps) => JSX.Element | null;
export default ERC20TotalSupply;
