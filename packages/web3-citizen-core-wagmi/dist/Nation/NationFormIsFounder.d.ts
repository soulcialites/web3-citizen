/// <reference types="react" />
interface NationFormIsFounderProps {
    className?: string;
    label: string;
    onUpdate?: Function;
    defaults?: any;
    contractAddress: string;
}
export declare const NationFormIsFounder: {
    ({ className, label, onUpdate, contractAddress, }: NationFormIsFounderProps): JSX.Element;
    defaultProps: {
        label: string;
    };
};
export default NationFormIsFounder;
