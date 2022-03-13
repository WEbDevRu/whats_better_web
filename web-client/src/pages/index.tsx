import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { LoginContainer } from '../container/LoginContainer';

const Home: NextPage = () => {
    return (
        <LoginContainer />
    );
};

export default Home;
