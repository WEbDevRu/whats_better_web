import React, { useEffect } from 'react';
import { Typography } from 'antd';
import styles from './ComparisionEntities.module.less';
import { ComparisonEntityCategory } from './ComparisonEntityCategory';
import { ComparisonEntitiesList } from './ComparisonEntitiesList';
import { useTranslation } from '../../../hooks/useTranslation';
import { NS_ADMIN_PANEL } from '../../../const/NAMESPACES';
import { AddComparisonEntityModal } from './AddComparisonEntityModal';
import { useQueryComparisonEntityLazyQuery } from './types/ComparisonEntity';
import { ComparisonEntity } from '../../../../graphql/types/graphql';

export const PAGINATION_PAGE_SIZE = 10;

const ComparisonEntities: React.FC = () => {
    const { t } = useTranslation(NS_ADMIN_PANEL);
    const [queryEntities, { data, refetch }] = useQueryComparisonEntityLazyQuery();

    useEffect(() => {
        queryEntities({
            variables: {
                page: 1,
                limit: 100,
            }
        });
    }, [queryEntities]);

    return (
        <div>
            <ComparisonEntityCategory />
            <Typography.Title
                level={2}
                className={styles.entityTitle}
            >
                {t('comparisonEntities.entities')}
            </Typography.Title>
            <AddComparisonEntityModal
                refetchList={refetch}
            />
            <ComparisonEntitiesList
                entities={data?.queryComparisonEntity as ComparisonEntity[]}
            />
        </div>
    );
};

export default React.memo(ComparisonEntities);
