/// <reference types="react" />
interface InputWithLabelProps {
    className?: string;
    label?: string;
    register: Function;
    required?: boolean;
    name?: string;
    placeholder?: string;
    type?: string;
}
export declare const InputWithLabel: ({ className, name, label, register, required, placeholder, type, }: InputWithLabelProps) => JSX.Element;
export default InputWithLabel;
