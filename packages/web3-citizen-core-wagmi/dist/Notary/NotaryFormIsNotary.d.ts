/// <reference types="react" />
interface NotaryFormIsNotaryProps {
    className?: string;
    label: string;
    onUpdate?: Function;
    defaults?: any;
    contractAddress: string;
}
export declare const NotaryFormIsNotary: {
    ({ className, label, onUpdate, contractAddress, }: NotaryFormIsNotaryProps): JSX.Element;
    defaultProps: {
        label: string;
    };
};
export default NotaryFormIsNotary;
