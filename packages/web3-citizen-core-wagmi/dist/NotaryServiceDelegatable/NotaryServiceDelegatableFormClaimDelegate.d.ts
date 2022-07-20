/// <reference types="react" />
interface NotaryServiceDelegatableFormClaimDelegateProps {
    className?: string;
    label: string;
    onUpdate?: Function;
    defaults?: any;
    contractAddress: string;
}
export declare const NotaryServiceDelegatableFormClaimDelegate: {
    ({ className, label, onUpdate, contractAddress, }: NotaryServiceDelegatableFormClaimDelegateProps): JSX.Element;
    defaultProps: {
        label: string;
    };
};
export default NotaryServiceDelegatableFormClaimDelegate;
