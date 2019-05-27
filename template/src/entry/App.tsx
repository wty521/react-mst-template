/**
 * @file 主程序
 * @author wangtianyu(wty_521@126.com)
 */

import '@babel/polyfill';
import React from 'react';
import {observer, Provider} from 'mobx-react';
import {hot} from 'react-hot-loader';

import global from '../stores/global';
import {Layout} from 'antd';

// components
import Header from "../components/Header";
import Footer from "../components/Footer";
import Content from "./Content";



@observer
class App extends React.Component {
    render() {

        return (
            <Provider globalStore={global}>
                <Layout>
                    <Header />
                    <Content />
                    <Footer />
                </Layout>
            </Provider>
        );
    }
}

/* globals module */
export default hot(module)(App);
