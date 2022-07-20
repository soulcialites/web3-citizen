/// <reference types="react" />
interface FormCitizenIssueProps {
    className?: string;
    label: string;
    onUpdate?: Function;
    defaults?: any;
    contractAddress: string;
}
export declare const FormCitizenIssue: {
    ({ className, label, onUpdate, contractAddress, }: FormCitizenIssueProps): JSX.Element;
    defaultProps: {
        label: string;
    };
};
export default FormCitizenIssue;
