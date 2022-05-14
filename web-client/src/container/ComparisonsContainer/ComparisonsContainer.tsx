import React from 'react';
import { Layout } from 'antd';
const { Content } = Layout;
import styles from './Comparisons.module.less';
import { AddComparison } from '../../component/AdminPanel/Comparisons/AddComparison';
import { ComparisonsList } from '../../component/AdminPanel/Comparisons/ComparisonsList';


const ComparisonsContainer: React.FC = ({}) => {

    return (

        <Layout>
            <Content className={styles.content}>
                <div style={{ padding: 24, minHeight: 360 }}>
                    <AddComparison />
                    <ComparisonsList />
                </div>
            </Content>
        </Layout>
    );
};

export default React.memo(ComparisonsContainer);
