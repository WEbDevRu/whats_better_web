import React from 'react';
import { Login } from '../../component/Login';
import styles from './LoginContainer.module.less';

interface IProps {

}


const LoginContainer: React.FC<IProps> = ({}) => {

    return (
        <div className={styles.cont}>
            <Login />
        </div>
    );
};

export default React.memo(LoginContainer);
