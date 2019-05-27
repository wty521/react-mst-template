import request from '../utils/request';
import unpack from '../decorators/unpack';

class UserApi {

    @unpack()
    getUserInfo() {
        return request
        .post('/api/user/info')
        .type('form');
    }
}

export default new UserApi();