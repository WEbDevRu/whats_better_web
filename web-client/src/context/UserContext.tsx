import React, {
    createContext,
    useContext,
    ReactElement,
    useState, useEffect,
} from 'react';
import { UserRole, UserRoles } from '../const/user/USER_ROLES';

import { AppState } from '../const/app/types';
import { useRequest } from '../hooks/useRequest';
import {
    API_AUTH_ADMIN_ME,
} from '../const/http/API_URLS';
import { RequestMethods } from '../const/http';
import { useApp } from './AppContext';
import { IUser } from '../types/user';

interface IContext {
    onGetMe: () => void,
    me: IUser | undefined,
    onLogin: ({ email, password }:{ email: string, password:string }) => void,
};

const UserContext = createContext({} as IContext);
export const useUser = () => useContext(UserContext);

interface PropsInterface {
    children: ReactElement | ReactElement[],
}

export const UserProvider = (props:PropsInterface) => {
    const { children } = props;

    const { setAppState } = useApp();
    const [me, setMe] = useState<IUser>();

    const { state: getMeRS, onRequest: onGetMeRequest } = useRequest({
        url: API_AUTH_ADMIN_ME,
        method: RequestMethods.Get
    });

    const { state: loginMeRS, onRequest: onLoginMeRequest } = useRequest({
        url: API_AUTH_ADMIN_ME,
        method: RequestMethods.Put
    });

    const onLogin = ({ email, password }:{email: string, password: string }) => {
        console.log(email, password);
        onLoginMeRequest({
            data: {
                email: email,
                password
            }
        });
    };

    const onGetMe = () => {
        onGetMeRequest();
    };

    useEffect(() => {
        setAppState({
            isInit: true,
            userRole: UserRoles.Guest
        });
    }, [getMeRS.status]);

    return (
        <UserContext.Provider
            value={{
                onGetMe,
                me,
                onLogin,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
