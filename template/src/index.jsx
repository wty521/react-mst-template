import React from 'react';
import { LocaleProvider } from 'antd';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { HashRouter as Router } from 'react-router-dom';
import { useStrict } from 'mobx';
import App from './app';
import stores from './store';
import './index.less';

useStrict(true);
const Root = () => (<Provider {...stores}>
  <Router>
    <App />
  </Router>
</Provider>);

if (module.hot) { // hmr necessary
  module.hot.accept();
}

render(<Root />, document.getElementById('root'));
