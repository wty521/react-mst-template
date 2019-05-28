import {types, Instance, getSnapshot, onSnapshot, onPatch} from 'mobx-state-tree';

import {wishItemModel} from './wishItem';
import {wishListModel} from './wishList';

it("can create a instance of model", () => {
    const item  = wishItemModel.create({
        name: 'bose qc35',
        price: 1499.99,
        image: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2797734210,89213534&fm=27&gp=0.jpg"
    });

    expect(item.price).toBe(1499.99);
    item.changeName('new Name');
    expect(item.name).toBe('new Name');

})

it("can create a instance of model", () => {
    const item  = wishItemModel.create({
        name: 'bose qc35',
        price: 1499.99
    });

    expect(item.price).toBe(1499.99);
    expect(item.image).toBe("");
})

it("can create a wishlist", () => {
    const wishList  = wishListModel.create({
        items: [{
            name: 'bose qc35',
            price: 1499.99,
            image: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2797734210,89213534&fm=27&gp=0.jpg"
        }]
    });

    expect(wishList.items.length).toBe(1);
    expect(wishList.items[0].price).toBe(1499.99);
})
it("can add item in  wishlist", () => {
    const list  = wishListModel.create();
    list.add(wishItemModel.create({
        name: 'bose qc35',
        price: 1999,
        image: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2797734210,89213534&fm=27&gp=0.jpg"
    }))

    expect(list.items.length).toBe(1);
    expect(list.items[0].price).toBe(1999);
    list.items[0].changeName('wty');
    expect(list.items[0].name).toBe('wty');

    expect(getSnapshot(list)).toEqual({
        items: [{
            name: 'wty',
            price: 1999,
            image: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2797734210,89213534&fm=27&gp=0.jpg"
        }]
    })
    expect(getSnapshot(list)).toMatchSnapshot()
})

it("can add item in  wishlist Snapshot" , () => {
    const list  = wishListModel.create();
    const patchs = []
    onPatch(list, patch => {
        patchs.push(patch)
    })
    list.add(wishItemModel.create({
        name: 'bose qc35',
        price: 1999,
    }))

    list.items[0].changeName('sony');

    expect(patchs).toMatchSnapshot();
})