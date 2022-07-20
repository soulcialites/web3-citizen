/// <reference types="react" />
interface NationIsFounderProps {
    className?: string;
    classNameLabel?: string;
    label: string;
    labelActive: boolean;
    labelTrue: string;
    labelFalse: string;
    contractAddress?: string;
    userAddress?: string;
}
export declare const NationIsFounder: {
    ({ className, classNameLabel, contractAddress, userAddress, label, labelActive, labelTrue, labelFalse, }: NationIsFounderProps): JSX.Element | null;
    defaultProps: {
        labelActive: boolean;
        label: string;
        labelTrue: string;
        labelFalse: string;
    };
};
export default NationIsFounder;
