import request from '../utils/request';
import unpack from '../decorators/unpack';

class UserApi {

    @unpack()
    getUserInfo() {
        return request
        .post('/api/user/info')
        .type('form');
    }

    @unpack()
    getList() {
        return request
        .post('/api/list')
        .type('form');
    }
}

export default new UserApi();