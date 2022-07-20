/// <reference types="react" />
interface NationRoleAdminRoleProps {
    className?: string;
    classNameLabel?: string;
    label: string;
    labelActive: boolean;
    contractAddress?: string;
    role: string;
}
export declare const NationRoleAdminRole: {
    ({ className, contractAddress, role, classNameLabel, label, labelActive, }: NationRoleAdminRoleProps): JSX.Element | null;
    defaultProps: {
        labelActive: boolean;
        label: string;
    };
};
export default NationRoleAdminRole;
