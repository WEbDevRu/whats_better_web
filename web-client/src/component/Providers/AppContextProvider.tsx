import React, { ReactElement } from 'react';
import { AppProvider } from '../../context/AppContext';
import { UserProvider } from '../../context/UserContext';

interface PropsAppContextProvider {
    children: ReactElement
}

const AppContextProvider: React.FC<PropsAppContextProvider> = ({ children }) => {

    return (
        <AppProvider>
            <UserProvider>
                {children}
            </UserProvider>
        </AppProvider>
    );
};

export default React.memo(AppContextProvider);
