import React from 'react';
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { LoginContainer } from '../../container/LoginContainer';
import { NS_COMMON, NS_AUTH } from '../../const/NAMESPACES';
import { Layout } from '../../component/Common/Layout';
import { UserRoles } from '../../const/user/USER_ROLES';

const Home: NextPage = () => {
    return (
        <Layout
            roles={UserRoles.Guest}
            redirectPath={'/'}
            isHideMenu
        >
            <LoginContainer />
        </Layout>
    );
};


export const getServerSideProps = async ({ locale }:{ locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale, [NS_COMMON, NS_AUTH])),
        locale
    },
});


export default Home;
