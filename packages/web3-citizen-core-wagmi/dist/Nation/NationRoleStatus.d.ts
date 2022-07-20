/// <reference types="react" />
interface NationRoleStatusProps {
    className?: string;
    classNameLabel?: string;
    roleActive?: boolean;
    label: string;
    labelActive: boolean;
    labelTrue: string;
    labelFalse: string;
    contractAddress?: string;
    role?: string;
}
export declare const NationRoleStatus: {
    ({ className, contractAddress, role, classNameLabel, roleActive, label, labelActive, labelTrue, labelFalse, }: NationRoleStatusProps): JSX.Element | null;
    defaultProps: {
        labelActive: boolean;
        label: string;
        labelTrue: string;
        labelFalse: string;
    };
};
export default NationRoleStatus;
