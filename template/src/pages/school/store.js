
import { ListStore } from '../../store/list';


class SchoolStore extends ListStore {
  static url = 'api/school';
  constructor() {
    super();
  }
}

const schoolStore = new SchoolStore();
export default schoolStore;
export { SchoolStore };
