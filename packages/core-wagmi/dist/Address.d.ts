/// <reference types="react" />
interface AddressProps {
    className?: string;
    address?: string;
    truncate?: boolean;
    length?: number;
}
export declare const Address: ({ className, truncate, address, }: AddressProps) => JSX.Element;
export default Address;
