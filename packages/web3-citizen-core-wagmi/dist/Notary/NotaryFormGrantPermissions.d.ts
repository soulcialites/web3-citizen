/// <reference types="react" />
interface NotaryFormGrantPermissionsProps {
    className?: string;
    label: string;
    onUpdate?: Function;
    defaults?: any;
    contractAddress: string;
}
export declare const NotaryFormGrantPermissions: {
    ({ className, label, onUpdate, contractAddress, }: NotaryFormGrantPermissionsProps): JSX.Element;
    defaultProps: {
        label: string;
    };
};
export default NotaryFormGrantPermissions;
