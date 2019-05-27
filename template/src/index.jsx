/**
 * @file 入口
 * @author wangtianyu(wty_521@126.com)
 */

import '@babel/polyfill';
import React from 'react';
import {render} from 'react-dom';

import App from './entry/App';

import './less/index.less';

const mainEl = document.getElementById('root');

render(
  <App />,
  mainEl
);
