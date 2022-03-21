import React from 'react';
import styles from './Login.module.less';
import { useTranslation } from '../../hooks/useTranslation';
import { NS_COMMON } from '../../const/NAMESPACES';

interface IProps {

}


const Login: React.FC<IProps> = ({}) => {
    const { t } = useTranslation(NS_COMMON);

    return (
        <div className={styles.selector}>
            {t('login')}
        </div>
    );
};

export default React.memo(Login);
