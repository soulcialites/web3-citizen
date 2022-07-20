/// <reference types="react" />
interface ERC20TransferFromProps {
    className?: string;
    onUpdate?: Function;
    defaults?: any;
    token: string;
    symbol?: string;
}
export declare const ERC20TransferFrom: ({ className, onUpdate, token, }: ERC20TransferFromProps) => JSX.Element;
export default ERC20TransferFrom;
