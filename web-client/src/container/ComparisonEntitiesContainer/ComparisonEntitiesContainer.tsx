import React from 'react';
import { Layout } from 'antd';
const { Content } = Layout;
import styles from './ComparisonEntitiesContainer.module.less';
import { ComparisonEntities } from '../../component/AdminPanel/ComparisonEntities';


const ComparisonEntitiesContainer: React.FC = ({}) => {

    return (

        <Layout>
            <Content className={styles.content}>
                <div style={{ padding: 24, minHeight: 360 }}>
                    <ComparisonEntities />
                </div>
            </Content>
        </Layout>
    );
};

export default React.memo(ComparisonEntitiesContainer);
