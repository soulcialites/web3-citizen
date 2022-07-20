/// <reference types="react" />
interface WalletERC20MintProps {
    className?: string;
    token: string;
    amount: string;
    to: string;
    symbol?: string;
}
export declare const WalletERC20Mint: ({ className, token, amount, symbol, }: WalletERC20MintProps) => JSX.Element;
export default WalletERC20Mint;
