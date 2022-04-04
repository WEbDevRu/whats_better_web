import React from 'react';
import { Layout, Breadcrumb } from 'antd';
const { Content } = Layout;
import styles from './CategoriesAdminPanelContainer.module.less';
import { AdminPanel } from '../../component/AdminPanel/';


const CategoriesAdminPanelContainer: React.FC = ({}) => {

    return (

        <Layout>
            <Content className={styles.content}>
                <Breadcrumb style={{ margin: '16px' }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    <AdminPanel />
                </div>
            </Content>
        </Layout>
    );
};

export default React.memo(CategoriesAdminPanelContainer);
