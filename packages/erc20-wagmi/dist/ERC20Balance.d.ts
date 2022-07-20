/// <reference types="react" />
interface ERC20BalanceProps {
    className?: string;
    account?: string;
    token: string;
}
export declare const ERC20Balance: ({ className, account, token, }: ERC20BalanceProps) => JSX.Element | null;
export default ERC20Balance;
