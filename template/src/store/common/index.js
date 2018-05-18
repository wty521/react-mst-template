import { observable, action } from 'mobx';

class CommonStore {

  @observable info = {
    count: 1,
    a: {
      b: {
        c: 2,
      },
    },
  }

  @action increaseCount = () => {
    this.info.count += 1;
  }

  @action decreaseCount = () => {
    if (this.info.count === 0) {
      return;
    }
    this.info.count -= 1;
  }

  @action deepChange = () => {
    this.info.a.b.c = 4;
  }
}

const commonStore = new CommonStore();
export default commonStore;
