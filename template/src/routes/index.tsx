/**
 * @file 首页
 * @author wty
 */

import React from 'react';
import {observer} from 'mobx-react';
import {Instance} from 'mobx-state-tree';
import {Link} from 'react-router-dom';

// store
import IndexStore from '../stores/IndexStore';


interface IProps {
    store: Instance<typeof IndexStore>;
}

@observer
export default class Index extends React.Component<IProps> {
    store: Instance<typeof IndexStore>;

    constructor(props) {
        super(props);
        this.store = IndexStore.create({});
    }

    render() {
        const {store} = this;

        return (
            <div>
                {store.text}
            </div>
        );
    }
}
