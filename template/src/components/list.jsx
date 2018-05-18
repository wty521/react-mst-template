import React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Table } from 'antd';
import listStore from '../store/list';

@observer
export default class List extends React.PureComponent {

  constructor() {
    super();
    this.state = {
      list: [],
    };
  }
  componentDidMount() {
    listStore.fetchList();
    setTimeout(() => {
      listStore.changeDataSource();
    }, 4000);
  }

  onChange = query => {
    listStore.fetchList(query);
  }

  componentWillReceiveProps(next) {
    console.log(next, 'props');
  }
  render() {
    const { list } = listStore;
    console.log(toJS(list), 'toJS(list)');
    return (
      <div>
        <Table
          onChange={this.onChange}
          columns={[{
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
          }, {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
          }, {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
          }]}
          {...toJS(list)}
        />
      </div>);
  }
}
