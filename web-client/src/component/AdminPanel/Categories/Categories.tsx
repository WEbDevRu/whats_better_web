import React, { useEffect } from 'react';
import styles from './Catergories.module.less';
import { AddCategory } from './AddCategory';
import { useCategories } from '../../../context/CategoriesContext';
import { CategoriesList } from './CategoriesList';

export const PAGINATION_PAGE_SIZE = 10;

const AdminPanel: React.FC = () => {
    const {
        onAddCategory,
        onLoadCategoriesList,
        categories,
    } = useCategories();

    return (
        <div>
            <AddCategory
                onAddCategory={onAddCategory}
            />
            <CategoriesList
                onLoadCategoriesList={onLoadCategoriesList}
                categories={categories}
            />
        </div>
    );
};

export default React.memo(AdminPanel);
