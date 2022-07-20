/// <reference types="react" />
interface NotaryIsNotaryProps {
    className?: string;
    labelTrue: string;
    labelFalse: string;
    contractAddress?: string;
    userAddress?: string;
}
export declare const NotaryIsNotary: {
    ({ className, contractAddress, userAddress, labelTrue, labelFalse, }: NotaryIsNotaryProps): JSX.Element | null;
    defaultProps: {
        labelTrue: string;
        labelFalse: string;
    };
};
export default NotaryIsNotary;
