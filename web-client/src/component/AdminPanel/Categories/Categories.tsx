import React from 'react';
import styles from './AdminPanel.module.less';
import { AddCategory } from './AddCategory';
import { useCategories } from '../../../context/CategoriesContext';


const AdminPanel: React.FC = () => {
    const { onAddCategory } = useCategories();

    return (
        <div>
            <AddCategory
                onAddCategory={onAddCategory}
            />
        </div>
    );
};

export default React.memo(AdminPanel);
