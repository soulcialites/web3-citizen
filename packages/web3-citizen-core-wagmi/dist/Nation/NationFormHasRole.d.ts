/// <reference types="react" />
interface NationFormHasRoleProps {
    className?: string;
    label: string;
    onUpdate?: Function;
    defaults?: any;
    contractAddress: string;
}
export declare const NationFormHasRole: {
    ({ className, label, onUpdate, contractAddress, }: NationFormHasRoleProps): JSX.Element;
    defaultProps: {
        label: string;
    };
};
export default NationFormHasRole;
