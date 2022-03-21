import React, { ReactElement } from 'react';
import { AppProvider } from '../../context/AppContext';

interface PropsAppContextProvider {
    children: ReactElement
}

const AppContextProvider: React.FC<PropsAppContextProvider> = ({ children }) => {

    return (
        <AppProvider>
            {children}
        </AppProvider>
    );
};

export default React.memo(AppContextProvider);
