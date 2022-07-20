/// <reference types="react" />
interface ERC20ApproveProps {
    className?: string;
    onUpdate?: Function;
    defaults?: any;
    token: string;
    symbol?: string;
}
export declare const ERC20Approve: ({ className, onUpdate, token, }: ERC20ApproveProps) => JSX.Element;
export default ERC20Approve;
