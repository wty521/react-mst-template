import React from 'react';
import { observer, inject } from 'mobx-react';
import { Button } from 'antd';

@inject('commonStore')
@observer
export default class Count extends React.Component {

  render() {
    const { decreaseCount, increaseCount } = this.props.commonStore;
    return (<div>
      操作组件 count：
      <Button
        // onClick={() => this.props.commonStore.info.count += 1}
        onClick={increaseCount}
      >
        +
      </Button>
      <Button
        // onClick={() => this.props.commonStore.info.count -= 1}
        onClick={decreaseCount}
      >
        -
      </Button>
    </div>);
  }
}
