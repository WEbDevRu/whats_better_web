import React from 'react';
import { Card, Typography, Button, Popconfirm } from 'antd';
import styles from './CategoryCard.module.less';
import { Category } from '../../../../../types/categories';
import { useTranslation } from '../../../../../hooks/useTranslation';
import { NS_ADMIN_PANEL, NS_COMMON } from '../../../../../const/NAMESPACES';
import { IRequest } from '../../../../../hooks/useRequest';

interface IProps {
    categoryData: Category,
    onDeleteCategory: (data:IRequest) => Promise<Record<string, any>>
}

const CategoryCard: React.FC<IProps> = ({
    categoryData,
    onDeleteCategory,
}) => {
    const { t } = useTranslation(NS_ADMIN_PANEL);
    const { t:tc } = useTranslation(NS_COMMON);

    const handleConfirmDeletion = () => {
        onDeleteCategory({
            id: categoryData.id
        });
    };

    return (
        <Card
            title={categoryData.title}
            className={styles.cont}
            extra={
                <Popconfirm
                    title={tc('confirmation.areYouSure')}
                    okText={tc('confirmation.yes')}
                    cancelText={tc('confirmation.no')}
                    onConfirm={handleConfirmDeletion}
                >
                    <Button danger type="text">
                        {t('categories.deleteCategory')}
                    </Button>
                </Popconfirm>
            }
        >
            <Typography >
                {categoryData.description}
            </Typography >
        </Card>
    );
};

export default React.memo(CategoryCard);
