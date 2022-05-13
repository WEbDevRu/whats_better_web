import React, { useEffect } from 'react';
import styles from './ComparisonEntitiesList.module.less';
import { ComparisonEntityCard } from './ComparisonEntityCard';
import { useQueryComparisonEntityLazyQuery } from './types/ComparisonEntity';


const ComparisonEntitiesList: React.FC = () => {
    const [queryEntities, { data }] = useQueryComparisonEntityLazyQuery();
    
    useEffect(() => {
        queryEntities({
            variables: {
                page: 1,
                limit: 100,
            }
        });
    }, [queryEntities]);


    return (
        <div className={styles.cont}>
            {data?.queryComparisonEntity?.map((entity) => (
                <ComparisonEntityCard
                    key={entity.id}
                    entity={entity}
                />
            ))
            }
        </div>
    );
};

export default React.memo(ComparisonEntitiesList);
