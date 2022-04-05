import React from 'react';
import {
    Button,
    Modal,
    Form,
    Input,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './AddCategory.module.less';
import { useModal } from '../../../../hooks/useModal';
import { useTranslation } from '../../../../hooks/useTranslation';
import { NS_ADMIN_PANEL } from '../../../../const/NAMESPACES';

interface IProps {

}

const AddCategory: React.FC<IProps> = ({

}) => {
    const createModal = useModal();
    const [form] = Form.useForm();

    const { t } = useTranslation(NS_ADMIN_PANEL);

    const handleSubmit = () => {
        createModal.onToggle();
        form.submit();
    };

    return (
        <>
            <Button
                type="primary"
                onClick={createModal.onShow}
                icon={<PlusOutlined />}
            >
                {t('categories.addCategory')}
            </Button>
            <Modal
                title="Title"
                visible={createModal.visible}
                onOk={handleSubmit}
                confirmLoading={createModal.confirmationLoading}
                onCancel={createModal.onClose}
            >
                <Form
                    layout="vertical"
                >
                    <Form.Item
                        label={t('categories.title.label')}
                        required
                    >
                        <Input placeholder={t('categories.title.placeholder')} />
                    </Form.Item>
                    <Form.Item
                        label={t('categories.description.label')}
                    >
                        <Input placeholder={t('categories.description.placeholder')} />
                    </Form.Item>
                </Form>
            </Modal>
            Content
        </>
    );
};

export default React.memo(AddCategory);
