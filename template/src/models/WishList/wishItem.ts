import {types} from 'mobx-state-tree';

export const wishItemModel = types
    .model({
        name: types.optional(types.string, ''),
        price: types.number,
        image: types.optional(types.string, ''),
    })
    .actions(self => {
        const changeName = (newName: string): void => {
            self.name = newName;
        };
        const changePrice = (newPrice: number): void => {
            self.price = newPrice;
        };
        const changeImage = (newImage: string): void => {
            self.image = newImage;
        }
         return {
            changeName,
            changePrice,
            changeImage
        };
    })