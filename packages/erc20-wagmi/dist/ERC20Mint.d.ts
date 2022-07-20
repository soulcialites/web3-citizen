/// <reference types="react" />
interface ERC20MintProps {
    className?: string;
    onUpdate?: Function;
    defaults?: any;
    token: string;
    symbol?: string;
}
export declare const ERC20Mint: ({ className, onUpdate, token }: ERC20MintProps) => JSX.Element;
export default ERC20Mint;
