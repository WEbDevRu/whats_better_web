import React from 'react';
import styles from './ComparisonsList.module.less';
import { ComparisonCard } from './ComparisonCard';

interface IProps {

}

const ComparisonsList: React.FC<IProps> = ({

}) => {

    return (
        <div>
            <ComparisonCard />
            <ComparisonCard />
        </div>
    );
};

export default React.memo(ComparisonsList);
