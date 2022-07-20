/// <reference types="react" />
interface NotaryFormRevokePermissionsProps {
    className?: string;
    label: string;
    onUpdate?: Function;
    defaults?: any;
    contractAddress: string;
}
export declare const NotaryFormRevokePermissions: {
    ({ className, label, onUpdate, contractAddress, }: NotaryFormRevokePermissionsProps): JSX.Element;
    defaultProps: {
        label: string;
    };
};
export default NotaryFormRevokePermissions;
