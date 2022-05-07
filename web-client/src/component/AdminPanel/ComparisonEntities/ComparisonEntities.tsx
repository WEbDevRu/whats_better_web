import React from 'react';
import styles from './ComparisionEntities.module.less';
import { ComparisonEntityCategory } from './ComparisonEntityCategory';
import { ComparisonEntitiesList } from './ComparisonEntitiesList';

export const PAGINATION_PAGE_SIZE = 10;

const ComparisonEntities: React.FC = () => {

    return (
        <div>
            <ComparisonEntityCategory />
            <ComparisonEntitiesList />
        </div>
    );
};

export default React.memo(ComparisonEntities);
