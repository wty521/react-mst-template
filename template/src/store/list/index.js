import { observable, action, computed } from 'mobx';
import axios from 'axios';

class ListStore {
  static url = 'api/list';

  @observable list = {
    loading: false,
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
    dataSource: [],
  }
  @computed get total() {
    return this.list.dataSource.length;
  }

  @action toggleLoading = () => {
    this.list.loading = !this.list.loading;
  }

  @action setList = (data) => {
    this.list.dataSource = data.list;
    this.list.pagination.total = data.length;
  }

  @action changeDataSource = () => {
    this.list.dataSource[0].name = 'abc';
  }

  @action fetchList = async (query) => {
    // action('toggleLoading', () => {
    //   this.list.loading = !this.list.loading;
    // })();
    this.toggleLoading();
    const result = await axios({
      method: 'get',
      url: this.constructor.url,
      responseType: 'json',
      params: query,
    }).then((res) => {
      if (res.status === 200) {
        return res;
      }
      throw new Error('服务器没给数据啊...');
    });

    if (result) {
      const { data } = result;
      this.toggleLoading();
      this.setList(data);
    }
  }
}

const listStore = new ListStore();
export default listStore;
export { ListStore };
