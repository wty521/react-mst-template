/**
 * @file router
 * @author wty
 */

import '@babel/polyfill';
import React from 'react';
import {
    HashRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import loadable from 'react-loadable';
import {observer} from 'mobx-react';

import {Layout} from 'antd';

// routes
const Index = loadable({
    loader: () => import(/* webpackChunkName: "index" */'../routes/index'),
    loading: () => <React.Fragment />
});

const { Content } = Layout;

@observer
class AppContent extends React.Component {
    render() {

        return (
            <Content>
                <Router>
                    <React.Fragment>
                        <Switch>
                            <Route path="/" exact component={Index} />
                            <Route path="/home" exact component={Index} />
                            <Redirect to="/" />
                        </Switch>
                    </React.Fragment>
                </Router>
            </Content>
        );
    }
}

export default AppContent;
