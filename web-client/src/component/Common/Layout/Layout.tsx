import React, {
    ReactElement,
    useEffect,
} from 'react';
import { Spin } from 'antd';
import { useRouter } from 'next/router';
import styles from './Layout.module.less';
import { isRoleMatch } from '../../../utils/user/isRoleMatch';
import { UserRole } from '../../../const/user/USER_ROLES';
import { useApp } from '../../../context/AppContext';

interface PropsInterface {
    children?: ReactElement | ReactElement[],
    redirectPath?: string,
    targetRole?: UserRole,
    roles?: UserRole | UserRole[],
    isHideMenu?: boolean
}

const Layout = (props:PropsInterface) => {
    const {
        children,
        redirectPath,
        roles,
        isHideMenu,
    } = props;

    const {
        appState,
    } = useApp();

    const router = useRouter();

    useEffect(() => {
        if (!appState?.isInit) {
            let joinRoles: Array<UserRole | undefined> = [];
            if (roles) {
                if (Array.isArray(roles)) {
                    joinRoles.concat(roles);
                } else if (roles){
                    joinRoles.push(roles);
                }
            }
        }
    }, [appState?.isInit, roles]);

    useEffect(() => {
        if (!appState?.isInit || roles || !redirectPath) {
            return;
        }
        if (roles && !isRoleMatch(appState.userRole, roles) && redirectPath) {
            router.push(redirectPath);
        }
    }, [
        appState?.isInit,
        appState?.userRole,
        roles,
        redirectPath,
        router.pathname
    ]);

    if (!appState?.isInit && roles || roles && !isRoleMatch(appState?.userRole, roles)) {
        return (
            <div className={styles.loaderContainer}>
                <Spin className={styles.spin}/>
            </div>
        );
    }

    return (
        <div className={styles.root}>
            {children}
        </div>
    );
};

export default Layout;
