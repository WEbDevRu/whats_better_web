import React from 'react';
import { Card, Typography } from 'antd';
import styles from './CategoryCard.module.less';
import { Category } from '../../../../../types/categories';

interface IProps {
    categoryData: Category,
}

const CategoryCard: React.FC<IProps> = ({
    categoryData,
}) => {

    return (
        <Card
            title={categoryData.title}
            className={styles.cont}
        >
            <Typography >
                {categoryData.description}
            </Typography >
        </Card>
    );
};

export default React.memo(CategoryCard);
