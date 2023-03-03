//페이지 안에 공통되는 것들을 처리

import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import Head from 'next/head';
import wrapper from '../store/configureStore';

const NodeBird = ({ Component }) => {
    return (
        <>
            <Head>
                <meta charSet='utf-8'></meta>
                <title>NodeBird</title>
            </Head>
            <Component />
        </>
    );
};

NodeBird.prototype = {
    Component: PropTypes.elementType.isRequired,
}

export default wrapper.withRedux(NodeBird);