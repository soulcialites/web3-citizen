/// <reference types="react" />
interface NotaryServiceDelegatableFormClaimInvocationProps {
    className?: string;
    label: string;
    onUpdate?: Function;
    defaults?: any;
    contractAddress: string;
}
export declare const NotaryServiceDelegatableFormClaimInvocation: {
    ({ className, label, onUpdate, contractAddress, }: NotaryServiceDelegatableFormClaimInvocationProps): JSX.Element;
    defaultProps: {
        label: string;
    };
};
export default NotaryServiceDelegatableFormClaimInvocation;
