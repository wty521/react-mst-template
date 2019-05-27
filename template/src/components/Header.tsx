
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Layout} from 'antd';

import globalStore from '../stores/global';

const {Header} = Layout;

@observer
class AppHeader extends Component {

    render() {
        const user = globalStore.user;

        return (
            <Header>
                <div>
                    Header
                </div>
                <div>
                    {user.userName}
                </div>
            </Header>
        )
    }
}
export default AppHeader;
