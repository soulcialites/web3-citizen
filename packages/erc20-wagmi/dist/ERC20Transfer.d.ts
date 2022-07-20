/// <reference types="react" />
interface ERC20TransferProps {
    className?: string;
    onUpdate?: Function;
    defaults?: any;
    token: string;
    symbol?: string;
}
export declare const ERC20Transfer: ({ className, onUpdate, token, }: ERC20TransferProps) => JSX.Element;
export default ERC20Transfer;
