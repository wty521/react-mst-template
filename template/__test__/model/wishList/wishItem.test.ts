import {wishItemModel} from '../../../src/models/WishList/wishItem';
import {wishListModel} from '../../../src/models/WishList/wishList';

it("can create a instance of model", () => {
    const item  = wishItemModel.create({
        name: 'bose qc35',
        price: 1499.99,
        image: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2797734210,89213534&fm=27&gp=0.jpg"
    });

    expect(item.price).toBe(1499.99);
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
})