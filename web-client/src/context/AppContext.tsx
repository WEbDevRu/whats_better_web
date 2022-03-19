import React, {
    createContext,
    useContext,
    ReactElement,
    useState, useEffect,
} from 'react';
import { UserRole, UserRoles } from '../const/user/USER_ROLES';

import { AppState } from '../const/app/types';
import { useRequest } from '../hooks/useRequest';
import { AUTH_API_ME } from '../const/http/API_URLS';
import { RequestMethods } from '../const/http';

interface IContext {
    appState: {
        isInit: boolean,
        userRole: UserRole | undefined
    } | null,
    onGetMe: () => void,
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
    
    const { state: getMeRS, onRequest: onGetMeRequest } = useRequest({
        url: AUTH_API_ME,
        method: RequestMethods.Get
    });
    
    const onGetMe = () => {
        onGetMeRequest();  
    };

    useEffect(() => {
        setAppState({
            isInit: true,
            userRole: UserRoles.Guest
        });
    }, [getMeRS.status]);

    console.log(appState);

    return (
        <AppContext.Provider
            value={{
                appState,
                onGetMe,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
