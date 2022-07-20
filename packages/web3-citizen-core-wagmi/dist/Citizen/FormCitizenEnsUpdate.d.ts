/// <reference types="react" />
interface FormCitizenEnsUpdateProps {
    className?: string;
    onUpdate?: Function;
    defaults?: any;
    contractAddress: string;
    ensNode: string;
    defaultValues?: any;
}
export declare const FormCitizenEnsUpdate: ({ className, onUpdate, contractAddress, ensNode, defaultValues, }: FormCitizenEnsUpdateProps) => JSX.Element;
export default FormCitizenEnsUpdate;
