/**
 * @file 全局数据层
 * @author wty
 */
import {Instance} from 'mobx-state-tree';

import User from '../models/User/index';


class GlobalStore {

    // 全局用户信息
    user:Instance<typeof User> = User.create({});
}

export default new GlobalStore();