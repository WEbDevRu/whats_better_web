import React, { useEffect } from 'react';
import { Pagination } from 'antd';
import styles from './CategoriesList.module.less';
import { CategoryCard  } from './CategoryCard';
import { CategoryPaginate } from '../../../../types/categories';
import { PAGINATION_PAGE_SIZE } from '../Categories';
import { IRequest } from '../../../../hooks/useRequest';

interface IProps {
    categories: CategoryPaginate,
    onLoadCategoriesList: (data:IRequest) => Promise<Record<string, any>>,
    onDeleteCategory: (data:IRequest) => Promise<Record<string, any>>
}

const CategoriesList: React.FC<IProps> = ({
    categories,
    onLoadCategoriesList,
    onDeleteCategory,
}) => {

    const handlePaginationPageChange = (activePageNumber:number) => {
        onLoadCategoriesList({
            params: {
                page: activePageNumber,
                limit: PAGINATION_PAGE_SIZE,
            }
        });
    };


    useEffect(() => {
        onLoadCategoriesList({
            params: {
                page: 1,
                limit: PAGINATION_PAGE_SIZE,
            }
        });
    },[]);


    return (
        <div className={styles.cont}>
            {categories.items.map((category) => (
                <CategoryCard
                    key={category.id}
                    categoryData={category}
                    onDeleteCategory={onDeleteCategory}
                />
            ))}
            {categories.isInit && (
                <Pagination
                    defaultCurrent={1}
                    total={categories.totalItems}
                    pageSize={PAGINATION_PAGE_SIZE}
                    onChange={handlePaginationPageChange}
                />
            )}
        </div>
    );
};

export default React.memo(CategoriesList);
