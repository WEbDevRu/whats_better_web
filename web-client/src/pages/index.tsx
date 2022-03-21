import React from 'react';
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { LoginContainer } from '../container/LoginContainer';
import { NS_COMMON } from '../const/NAMESPACES';
import { Layout } from '../component/Common/Layout';
import { UserRoles } from '../const/user/USER_ROLES';
import { LOGIN } from '../const/http/WEB_CLIENT_PATHS';

const Home: NextPage = () => {
    return (
        <Layout
            roles={UserRoles.Admin}
            redirectPath={LOGIN}
        >
            <LoginContainer />
        </Layout>
    );
};


export const getServerSideProps = async ({ locale }:{ locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale, [NS_COMMON])),
        locale
    },
});


export default Home;
