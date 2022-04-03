import React from 'react';
import { Login } from '../../component/Login';
import styles from './LoginContainer.module.less';
import { useUser } from '../../context/UserContext';


const LoginContainer: React.FC = ({}) => {
    const { onLogin } = useUser();

    return (
        <div className={styles.cont}>
            <Login
                onLogin={onLogin}
            />
        </div>
    );
};

export default React.memo(LoginContainer);
