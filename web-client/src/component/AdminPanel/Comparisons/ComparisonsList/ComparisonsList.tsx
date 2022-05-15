import React from 'react';
import { Comparison } from '../../../../../graphql/types/graphql';
import styles from './ComparisonsList.module.less';
import { ComparisonCard } from './ComparisonCard';

interface IProps {
    comparisons: Partial<Comparison>[]
}

const ComparisonsList: React.FC<IProps> = ({
    comparisons,
}) => {

    return (
        <div className={styles.cont}>
            {comparisons?.map((comparison) => (
                <ComparisonCard
                    key={comparison.id}
                    comparison={comparison}
                />
            ))}
        </div>
    );
};

export default React.memo(ComparisonsList);
