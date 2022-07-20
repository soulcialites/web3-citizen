/// <reference types="react" />
interface NotaryServiceDelegatableFormClaimProps {
    className?: string;
    label: string;
    onUpdate?: Function;
    defaults?: any;
    contractAddress: string;
}
export declare const NotaryServiceDelegatableFormClaim: {
    ({ className, label, onUpdate, contractAddress, }: NotaryServiceDelegatableFormClaimProps): JSX.Element;
    defaultProps: {
        label: string;
    };
};
export default NotaryServiceDelegatableFormClaim;
