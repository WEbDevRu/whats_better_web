import React, { useEffect } from 'react';
import { Layout, Typography } from 'antd';
import { Comparison } from '../../../graphql/types/graphql';
const { Content } = Layout;
import styles from './Comparisons.module.less';
import { AddComparison } from '../../component/AdminPanel/Comparisons/AddComparison';
import { ComparisonsList } from '../../component/AdminPanel/Comparisons/ComparisonsList';
import { useQueryComparisonLazyQuery } from './types/Comparisons';


const ComparisonsContainer: React.FC = ({}) => {

    const [queryComparisons, { data, refetch }] = useQueryComparisonLazyQuery();

    useEffect(() => {
        queryComparisons({
            variables: {
                page: 1,
                limit: 100,
            }
        });
    }, [queryComparisons]);

    return (

        <Layout>
            <Content className={styles.content}>
                <div style={{ padding: 24, minHeight: 360 }}>
                    <Typography.Title
                        level={2}
                    >
                        Comparisons
                    </Typography.Title>
                    <AddComparison
                        refetchList={refetch}
                    />
                    <ComparisonsList
                        comparisons={data?.queryComparison as Partial<Comparison>[]}
                    />
                </div>
            </Content>
        </Layout>
    );
};

export default React.memo(ComparisonsContainer);
