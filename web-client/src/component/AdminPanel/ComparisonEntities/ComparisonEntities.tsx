import React from 'react';
import { Typography } from 'antd';
import styles from './ComparisionEntities.module.less';
import { ComparisonEntityCategory } from './ComparisonEntityCategory';
import { ComparisonEntitiesList } from './ComparisonEntitiesList';
import { useTranslation } from '../../../hooks/useTranslation';
import { NS_ADMIN_PANEL } from '../../../const/NAMESPACES';

export const PAGINATION_PAGE_SIZE = 10;

const ComparisonEntities: React.FC = () => {
    const { t } = useTranslation(NS_ADMIN_PANEL);

    return (
        <div>
            <ComparisonEntityCategory />
            <Typography.Title
                level={2}
                className={styles.entityTitle}
            >
                {t('comparisonEntities.entities')}
            </Typography.Title>
            <ComparisonEntitiesList />
        </div>
    );
};

export default React.memo(ComparisonEntities);
