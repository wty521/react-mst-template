
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Layout} from 'antd';

const {Footer} = Layout;

@observer
class AppFooter extends Component {

    render() {
        return (
            <Footer>
                Footer
            </Footer>
        )
    }
}
export default AppFooter;
