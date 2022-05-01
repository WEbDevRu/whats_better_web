import React from 'react';
import styles from './ComparisionEntities.module.less';
import { ComparisonEntityCategory } from './ComparisonEntityCategory';

export const PAGINATION_PAGE_SIZE = 10;

const ComparisonEntities: React.FC = () => {

    return (
        <div>
            <ComparisonEntityCategory />
        </div>
    );
};

export default React.memo(ComparisonEntities);
