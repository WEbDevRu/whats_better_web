import React from 'react';
import styles from './AdminPanel.module.less';
import { AddCategory } from './AddCategory';

interface IProps {

}

const AdminPanel: React.FC<IProps> = ({

}) => {

    return (
        <div>
            <AddCategory />
            Content
        </div>
    );
};

export default React.memo(AdminPanel);
