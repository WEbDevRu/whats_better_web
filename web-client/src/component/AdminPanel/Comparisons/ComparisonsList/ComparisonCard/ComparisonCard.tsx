import React from 'react';
import {
    Card,
    Typography,
    Divider,
    Tag,
} from 'antd';
import { Comparison } from '../../../../../../graphql/types/graphql';
import styles from './ComparisonCard.module.less';

interface IProps {
    comparison: Partial<Comparison>
}

const ComparisonCard: React.FC<IProps> = ({
    comparison,
}) => {

    return (
        <Card
            title={comparison.title}
            className={styles.cont}
        >
            <Typography>
                {comparison.description}
            </Typography>
            <Divider />
            {comparison.comparisonEntities?.map((entity) =>  (
                <Tag
                    key={entity.id}
                >
                    {entity.title}
                </Tag>
            ))}
        </Card>
    );
};

export default React.memo(ComparisonCard);
