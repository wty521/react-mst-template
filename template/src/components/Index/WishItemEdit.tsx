import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {toJS} from 'mobx';
import { Instance } from 'mobx-state-tree';
import IndexStore from '../../stores/IndexStore';
import { List, Avatar } from 'antd';
interface IProps {
    store: Instance<typeof IndexStore>;
}

@observer
class WishItemEdit extends Component<IProps> {

    render() {
        const { store } = this.props;
        const { wishList: {items} } = store;

        return (
            <div>

            </div>
        )
    }
}
export default WishItemEdit;
