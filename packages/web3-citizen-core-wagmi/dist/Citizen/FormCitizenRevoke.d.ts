/// <reference types="react" />
interface FormCitizenRevokeProps {
    className?: string;
    onUpdate?: Function;
    defaults?: any;
    contractAddress: string;
}
export declare const FormCitizenRevoke: ({ className, onUpdate, contractAddress, }: FormCitizenRevokeProps) => JSX.Element;
export default FormCitizenRevoke;
