/// <reference types="react" />
interface NationFormDisableRoleProps {
    className?: string;
    label: string;
    onUpdate?: Function;
    defaults?: any;
    contractAddress: string;
}
export declare const NationFormDisableRole: {
    ({ className, label, onUpdate, contractAddress, }: NationFormDisableRoleProps): JSX.Element;
    defaultProps: {
        label: string;
    };
};
export default NationFormDisableRole;
