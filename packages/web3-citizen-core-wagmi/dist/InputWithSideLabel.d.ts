/// <reference types="react" />
interface InputWithSideLabelProps {
    className?: string;
    label?: string;
    register: Function;
    required?: boolean;
    name?: string;
    placeholder?: string;
    type?: string;
}
export declare const InputWithSideLabel: ({ className, name, label, register, required, placeholder, type, }: InputWithSideLabelProps) => JSX.Element;
export default InputWithSideLabel;
