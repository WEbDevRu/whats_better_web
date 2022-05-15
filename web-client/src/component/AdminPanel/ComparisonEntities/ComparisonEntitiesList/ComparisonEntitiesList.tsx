import React, { useEffect } from 'react';
import { ComparisonEntity } from '../../../../../graphql/types/graphql';
import styles from './ComparisonEntitiesList.module.less';
import { ComparisonEntityCard } from './ComparisonEntityCard';

interface IProps {
    entities: ComparisonEntity[]
}

const ComparisonEntitiesList: React.FC<IProps> = ({ entities }) => {

    return (
        <div className={styles.cont}>
            {entities?.map((entity) => (
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
