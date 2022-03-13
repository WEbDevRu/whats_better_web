import React from 'react';
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { LoginContainer } from '../container/LoginContainer';
import { NS_COMMON } from '../const/NAMESPACES';

const Home: NextPage = (props) => {
    console.log(props);
    return (
        <LoginContainer />
    );
};


export const getServerSideProps = async ({ locale }:{ locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale, [NS_COMMON])),
        locale
    },
});


export default Home;
