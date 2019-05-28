/**
 * @file user model
 * @author wty
 */

import {types, flow, applySnapshot} from 'mobx-state-tree';

// api
import UserApi from '../../api/user';
// constant
import {USER_TYPE} from '../../constants/user';

interface IVolatile {

}

export default types
    .model(
        'User',
        {
            userId: types.optional(types.number, 0),
            // 用户名
            userName: types.optional(types.string, ''),
            // 昵称
            nickname: types.optional(types.string, ''),
            userType: types.optional(types.number, 0)
        }
    )
    .volatile<IVolatile>(() => ({

    }))
    .views(self => ({
        get isVip(): boolean {
            return self.userType === USER_TYPE.VIP;
        },
        get isNormal(): boolean {
            return self.userType === USER_TYPE.NORMAL;
        },
        get isSvip(): boolean {
            return self.userType === USER_TYPE.SVIP;
        }
    }))
    .actions(self => ({
        validate() {
            let validateResult = true;
            return validateResult;
        }
    }))
    .actions(self => {
        const getUserInfo = flow(function* () {
            const data = yield UserApi.getUserInfo();
            applySnapshot(self, data);
        });
        return {
            getUserInfo
        }
    })
    .actions(self => ({
        // 生命周期函数
        afterCreate(): void {
            // 初始化集群任务列表
            self.getUserInfo();
        }
    }))
