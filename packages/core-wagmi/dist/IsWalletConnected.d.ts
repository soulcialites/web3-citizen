import * as React from 'react';
import PropTypes from 'prop-types';
interface IsWalletConnectedProps {
    children: React.ReactNode;
    loading: React.ReactNode;
    enableButton: boolean;
}
export declare const IsWalletConnected: {
    ({ children, loading, }: IsWalletConnectedProps): React.ReactNode;
    defaultProps: {
        loading: null;
    };
    propTypes: {
        loading: PropTypes.Requireable<(...args: any[]) => any>;
    };
};
export default IsWalletConnected;
