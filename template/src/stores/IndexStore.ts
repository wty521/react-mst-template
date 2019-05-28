
import {types, flow, applySnapshot} from 'mobx-state-tree';
import {wishListModel} from '../models/WishList/wishList';
import UserApi from '../api/user';

export default types
    .model(
        'IndexStore',
        {
            // banner文本
            text: types.optional(types.string, ''),
            wishList: types.optional(wishListModel, {}),
        }
    )
    .views(self => ({

    }))
    .actions(self => ({
        init(): void {
            self.text = 'index页';
        }
    }))
    .actions(self => ({
        getListData: flow(function* getListData() {
            try {
                const data = yield UserApi.getList();
                self.wishList.items = data;
            } catch (error) {
                console.log(error);
            }
        })

    }))
    // life cycle
    .actions(self => ({
        afterCreate(): void {
            self.init();
            self.getListData();
        }
    }));
