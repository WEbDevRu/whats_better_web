import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Layout, Menu } from 'antd';
import {
    ProfileOutlined,
    PieChartOutlined,
    SettingOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

import styles from './Sidebar.module.less';

import { NS_ADMIN_PANEL, NS_COMMON } from '../../../const/NAMESPACES';
import { useTranslation } from '../../../hooks/useTranslation';
import { CATEGORIES } from '../../../const/http/WEB_CLIENT_PATHS';

interface IProps {

}

const Sidebar: React.FC<IProps> = ({

}) => {

    const { t } = useTranslation(NS_ADMIN_PANEL);
    const { t:tc } = useTranslation(NS_COMMON);
    const router = useRouter();

    const [selectedItemKey, setSelectedItemKey] = useState<string>('1');

    useEffect(() => {
        if (router.pathname === '/') {
            setSelectedItemKey('1');
        }
        if (router.pathname === CATEGORIES) {
            setSelectedItemKey('2');
        }
        console.log(router.pathname);
    }, [router.pathname]);

    return (
        <Sider collapsible>
            <Menu
                theme="dark"
                defaultSelectedKeys={[selectedItemKey]}
                selectedKeys={[selectedItemKey]}
                mode="inline"
            >
                <Menu.Item
                    className={styles.logoItem}
                    icon={
                        <SettingOutlined />
                    }
                    disabled
                >

                    {tc('adminPanel')}
                </Menu.Item>
                <Menu.Item key="1" icon={<PieChartOutlined />}>
                    <Link
                        href={'/'}
                    >
                        <a href={'/'} >
                            {t('pages.main')}
                        </a>
                    </Link>
                </Menu.Item>
                <Menu.Item key='2' icon={<ProfileOutlined />}>
                    <Link
                        href={CATEGORIES}
                    >
                        <a href={CATEGORIES} >
                            {t('pages.categories')}
                        </a>
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default React.memo(Sidebar);
