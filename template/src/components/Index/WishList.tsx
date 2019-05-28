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
class WishList extends Component<IProps> {

    render() {
        const { store } = this.props;
        const { wishList: {items} } = store;

        return (
            <List
                itemLayout="horizontal"
                dataSource={toJS(items)}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={item.image} />}
                            title={<span>{item.name}</span>}
                            description={item.price}
                        />
                    </List.Item>
                )}
            />
        )
    }
}
export default WishList;
