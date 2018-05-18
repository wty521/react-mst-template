import React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Table } from 'antd';
import listStore from './store';

@observer
export default class School extends React.PureComponent {

  constructor() {
    super();
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    listStore.fetchList();
  }

  onChange = query => {
    listStore.fetchList(query);
  }

  render() {
    const { list } = listStore;
    console.log(toJS(list), 'toJS(list)');
    return (
      <div>
        <Table
          onChange={this.onChange}
          columns={[{
            title: '校名',
            dataIndex: 'name',
            key: 'name',
          }, {
            title: '所在地',
            dataIndex: 'location',
            key: 'location',
          }, {
            title: '校徽',
            dataIndex: 'color',
            key: 'color',
            render: (v) => {
              return <div style={{ background: v}}>h</div>;
            },
          }]}
          {...toJS(list) }
        />
      </div>);
  }
}
