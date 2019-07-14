/**
 * @file 首页
 * @author wty
 */

import React from 'react';
import {observer} from 'mobx-react';
import {Instance} from 'mobx-state-tree';
import {Link} from 'react-router-dom';
import {Button} from 'antd';

// store
import IndexStore from '../stores/IndexStore';

// components
import WishList from  '../components/Index/WishList';

interface IProps {
    store: Instance<typeof IndexStore>;
}

@observer
export default class Index extends React.Component<IProps> {
    store: Instance<typeof IndexStore> = IndexStore.create({});

    timer: NodeJS.Timeout | null = null;

    addTimer = (): void => {
        const {wishList: {items}} = this.store;
        if (this.timer) {
            return
        }
        this.timer = setInterval(() => {
            items.forEach(item => {
                item.changePrice(item.price+1);
            })
        }, 1000)
    }

    clearTimer = (): void => {
        clearInterval(Number(this.timer));
        this.timer = null;
    };

    componentWillUnmount() {
        this.clearTimer();
    }

    render() {
        const {store} = this;
        const {wishList} = store;

        return (
            <div>
                {store.text}
                <WishList store={store} />
                <div>
                    <Button type="primary" onClick={this.addTimer}>add 1￥/秒</Button>
                    <Button onClick={this.clearTimer}>clear Timer</Button>
                </div>
                <p>Total: {wishList.totalPrice}￥</p>
            </div>
        );
    }
}
