import React, {
    createContext,
    useContext,
    ReactElement,
    useState,
} from 'react';
import { UserRole } from '../const/user/USER_ROLES';

import { AppState } from '../const/app/types';

interface IContext {
    appState: {
        isInit: boolean,
        userRole: UserRole | undefined
    } | null,
};

const AppContext = createContext({} as IContext);
export const useApp = () => useContext(AppContext);

interface PropsInterface {
    children: ReactElement | ReactElement[],
}

export const AppProvider = (props:PropsInterface) => {
    const { children } = props;

    const [appState, setAppState] = useState<AppState>({
        isInit: false,
        userRole: undefined,
    });

    return (
        <AppContext.Provider
            value={{
                appState,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
