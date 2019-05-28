import {types, Instance, flow, applySnapshot} from 'mobx-state-tree';
import {wishItemModel} from './wishItem';


export const wishListModel = types
    .model({
        items: types.optional(types.array(wishItemModel), []),
    })
    .views(self => ({
        get totalPrice(): number {
            return self.items.reduce((sum, item) => sum + item.price, 0);
        }
    }))
    .actions(self => ({
        add(item: Instance<typeof wishItemModel>): void {
            self.items.push(item);
        }
    }))

