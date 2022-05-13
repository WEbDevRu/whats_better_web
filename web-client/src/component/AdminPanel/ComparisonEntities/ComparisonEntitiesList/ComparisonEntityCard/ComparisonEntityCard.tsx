import React from 'react';
import { Card, Tag, Divider, Tooltip, Typography } from 'antd';
import { ComparisonEntity } from '../../../../../../graphql/types/graphql';
import styles from './ComparisonEntityCard.module.less';

interface IProps {
    entity: Partial<ComparisonEntity >
}

const ComparisonEntityCard: React.FC<IProps> = ({ entity }) => {

    return (
        <Card
            title={entity.title}
            className={styles.cont}
        >
            <Typography>
                {entity.description}
            </Typography>
            <Tag
                color="#f50"
                className={styles.type}
            >
                {entity.type}
            </Tag>
            <Divider />
            {entity.entityCategories?.map((category) => (
                <Tooltip
                    title={category.description}
                    key={category.id}
                >
                    <Tag>
                        {category.title}
                    </Tag>
                </Tooltip>

            ))}
        </Card>
    );
};

export default React.memo(ComparisonEntityCard);
