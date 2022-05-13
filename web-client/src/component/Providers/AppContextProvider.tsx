import React, { ReactElement } from 'react';
import { ApolloProvider } from '@apollo/client';
import { AppProvider } from '../../context/AppContext';
import { UserProvider } from '../../context/UserContext';
import { CategoriesProvider } from '../../context/CategoriesContext';
import { ComparisonEntityProvider } from '../../context/ComparisonEntityContext';
import apolloClient from '../../config/apolloClient';

interface PropsAppContextProvider {
    children: ReactElement
}

const AppContextProvider: React.FC<PropsAppContextProvider> = ({ children }) => {

    return (
        <ApolloProvider
            client={apolloClient}
        >
            <AppProvider>
                <UserProvider>
                    <CategoriesProvider>
                        <ComparisonEntityProvider>
                            {children}
                        </ComparisonEntityProvider>
                    </CategoriesProvider>
                </UserProvider>
            </AppProvider>
        </ApolloProvider>
    );
};

export default React.memo(AppContextProvider);
