/// <reference types="react" />
interface NationFormRoleRevokeProps {
    className?: string;
    label: string;
    onUpdate?: Function;
    defaults?: any;
    contractAddress: string;
}
export declare const NationFormRoleRevoke: {
    ({ className, label, onUpdate, contractAddress, }: NationFormRoleRevokeProps): JSX.Element;
    defaultProps: {
        label: string;
    };
};
export default NationFormRoleRevoke;
