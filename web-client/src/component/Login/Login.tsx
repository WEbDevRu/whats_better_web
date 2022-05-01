import React, { useEffect } from 'react';
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
import { ADMIN_WRONG_LOGIN_OR_PASSWORD } from '../../const/http/errors/AUTH_ERRORS_CODES';
import { IResponse } from '../../hooks/useRequest';
import { useFieldResponseErrors } from '../../hooks/useFieldResponseErrors';

interface IProps {
    onLogin: ({ email, password }:{ email: string, password: string }) => void,
    loginMeRS: IResponse,
}

const Login: React.FC<IProps> = ({
    onLogin,
    loginMeRS,
}) => {
    const { t } = useTranslation(NS_AUTH);
    const { t: tc } = useTranslation(NS_COMMON);
    const [form] = Form.useForm();

    const handleFinish = (values:Record<string, string>) => {
        onLogin({ email: values.email, password: values.password });
    };

    const { fieldErrors } = useFieldResponseErrors({
        response: loginMeRS,
        expectedErrors: [{
            errorCode: ADMIN_WRONG_LOGIN_OR_PASSWORD,
            errorText: t('loginForm.errors.wrongLoginOrPassword'),
            fieldName: 'password'
        }]
    });

    useEffect(() => {
        form.setFields(fieldErrors);
    }, [fieldErrors]);


    return (
        <Card
            className={styles.cont}
            title={t('adminLogin')}
        >
            <Form
                name="normal_login"
                onFinish={handleFinish}
                form={form}
            >
                <Form.Item
                    name='email'
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
                    <Button type="primary" htmlType="submit" >
                        {t('actions.login')}
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default React.memo(Login);
