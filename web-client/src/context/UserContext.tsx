import React, { createContext, ReactElement, useContext, useEffect, useState, } from 'react';
import { UserRoles } from '../const/user/USER_ROLES';
import { useRequest } from '../hooks/useRequest';
import { API_AUTH_ADMIN_ME, } from '../const/http/API_URLS';
import { RequestMethods, RequestStatuses } from '../const/http';
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
        if (getMeRS.status === RequestStatuses.Succeeded) {
            setAppState({
                isInit: true,
                userRole: UserRoles.Admin
            });
        }
        if (getMeRS.status === RequestStatuses.Failed) {
            setAppState({
                isInit: true,
                userRole: UserRoles.Guest
            });
        }
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
