import React from 'react';
import {
    Card,
    Form,
    Input,
    Button
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './Login.module.less';
import { useTranslation } from '../../hooks/useTranslation';
import {
    NS_AUTH,
    NS_COMMON,
} from '../../const/NAMESPACES';

interface IProps {

}


const Login: React.FC<IProps> = ({}) => {
    const { t } = useTranslation(NS_AUTH);
    const { t: tc } = useTranslation(NS_COMMON);

    const handleFinish = (values:Record<string, string>) => {
        console.log(values);
    };

    const [form] = Form.useForm();

    console.log(form);

    return (
        <Card
            className={styles.cont}
            title={t('adminLogin')}
        >
            <Form
                name="normal_login"
                initialValues={{ remember: true }}
                onFinish={handleFinish}
            >
                <Form.Item
                    name='username'
                    rules={[{
                        required: true,
                        message: tc('formErrors.empty', { fieldName: t('loginForm.emailInput.placeholder') })
                    }]}
                >
                    <Input prefix={<UserOutlined />} placeholder={t('loginForm.emailInput.placeholder')} />
                </Form.Item>
                <Form.Item
                    name='password'
                    rules={[{
                        required: true,
                        message: tc('formErrors.empty', { fieldName: t('loginForm.passwordInput.placeholder') })
                    }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder={t('loginForm.passwordInput.placeholder')}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        {t('actions.login')}
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default React.memo(Login);
