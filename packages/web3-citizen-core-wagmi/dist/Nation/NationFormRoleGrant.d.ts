/// <reference types="react" />
interface NationFormRoleGrantProps {
    className?: string;
    label: string;
    onUpdate?: Function;
    defaults?: any;
    contractAddress: string;
}
export declare const NationFormRoleGrant: {
    ({ className, label, onUpdate, contractAddress, }: NationFormRoleGrantProps): JSX.Element;
    defaultProps: {
        label: string;
    };
};
export default NationFormRoleGrant;
