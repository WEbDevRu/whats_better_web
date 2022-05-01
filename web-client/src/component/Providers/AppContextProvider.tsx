import React, { ReactElement } from 'react';
import { AppProvider } from '../../context/AppContext';
import { UserProvider } from '../../context/UserContext';
import { CategoriesProvider } from '../../context/CategoriesContext';
import { ComparisonEntityProvider } from '../../context/ComparisonEntityContext';

interface PropsAppContextProvider {
    children: ReactElement
}

const AppContextProvider: React.FC<PropsAppContextProvider> = ({ children }) => {

    return (
        <AppProvider>
            <UserProvider>
                <CategoriesProvider>
                    <ComparisonEntityProvider>
                        {children}
                    </ComparisonEntityProvider>
                </CategoriesProvider>
            </UserProvider>
        </AppProvider>
    );
};

export default React.memo(AppContextProvider);
