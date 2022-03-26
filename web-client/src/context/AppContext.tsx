import React, {
    createContext,
    useContext,
    ReactElement,
    useState,
    Dispatch,
    SetStateAction,
} from 'react';
import { UserRole, UserRoles } from '../const/user/USER_ROLES';

import { useRequest } from '../hooks/useRequest';
import { AUTH_API_ME } from '../const/http/API_URLS';
import { RequestMethods } from '../const/http';
import { IAppState } from '../types/app';

interface IContext {
    appState: IAppState | null,
    setAppState: Dispatch<SetStateAction<IAppState>>
};

const AppContext = createContext({} as IContext);
export const useApp = () => useContext(AppContext);

interface PropsInterface {
    children: ReactElement | ReactElement[],
}

export const AppProvider = (props:PropsInterface) => {
    const { children } = props;

    const [appState, setAppState] = useState<IAppState>({
        isInit: false,
        userRole: undefined,
    });

    return (
        <AppContext.Provider
            value={{
                appState,
                setAppState,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
