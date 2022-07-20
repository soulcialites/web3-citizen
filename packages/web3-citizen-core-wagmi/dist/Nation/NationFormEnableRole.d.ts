/// <reference types="react" />
interface NationFormEnableRoleProps {
    className?: string;
    label: string;
    onUpdate?: Function;
    defaults?: any;
    contractAddress: string;
}
export declare const NationFormEnableRole: {
    ({ className, label, onUpdate, contractAddress, }: NationFormEnableRoleProps): JSX.Element;
    defaultProps: {
        label: string;
    };
};
export default NationFormEnableRole;
