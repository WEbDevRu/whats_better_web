import React from 'react';
import styles from './ComparisonEntitiesList.module.less';
import { ComparisonEntityCard } from './ComparisonEntityCard';


const ComparisonEntitiesList: React.FC = () => {

    return (
        <div>
            <ComparisonEntityCard />
        </div>
    );
};

export default React.memo(ComparisonEntitiesList);
