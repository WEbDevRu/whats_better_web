import React from 'react';
import { Button, Form, Input, Modal, } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useModal } from '../../../../hooks/useModal';
import { useTranslation } from '../../../../hooks/useTranslation';
import { NS_ADMIN_PANEL, NS_COMMON } from '../../../../const/NAMESPACES';
import { IRequest, IResponse } from '../../../../hooks/useRequest';
import { RequestStatuses } from '../../../../const/http';

interface IProps {
    onAddCategory: (data:IRequest) => Promise<Record<string, any>>,
}

const AddCategory: React.FC<IProps> = ({
    onAddCategory,
}) => {
    const createModal = useModal();
    const [form] = Form.useForm();

    const { t } = useTranslation(NS_ADMIN_PANEL);
    const { t:tc } = useTranslation(NS_COMMON);

    const handleSubmit = async () => {
        form.submit();
    };
    
    const handleFinish = async (values:Record<string, string>) => {
        createModal.onStartConfirmationLoading();
        const result = await onAddCategory({
            data: {
                title: values.title,
                description: values.description,
            }
        });
        if (result?.id) {
            createModal.onClose();
            createModal.onStopConfirmationLoading();
            form.resetFields();
        }
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
                    onFinish={handleFinish}
                    form={form}
                >
                    <Form.Item
                        label={t('categories.title.label')}
                        required
                        name='title'
                        rules={[{
                            required: true,
                            message: tc('formErrors.empty', { fieldName: t('categories.title.label') })
                        }]}
                    >
                        <Input placeholder={t('categories.title.placeholder')} />
                    </Form.Item>
                    <Form.Item
                        label={t('categories.description.label')}
                        name='description'
                    >
                        <Input placeholder={t('categories.description.placeholder')} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default React.memo(AddCategory);
