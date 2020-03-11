import Tester from '../../../../tests/Tester'
import Cart, { CartItem as CartCartItem } from './Cart'
import Product, { CartItem as ProductCartItem, CartActions } from './Product';
import ShoppingCart, { PRODUCTS } from './ShoppingCart.jsx';

const testProduct = {
  id: 'Fossil_Gen_5',
  display_name: 'Fossil Gen5',
  price: 24900,
  manufacturer: 'Fossil',
  image: 'https://abcd.com/efg.png',
  currency: 'CAD',
};

const testRunner = new Tester();

describe('ShoppingCart', () => {
  test('it should render', () => {
    const { component } = testRunner.getMountedInstance(ShoppingCart);
    expect(component).toBeDefined();
    expect(component.find(Product).length).toEqual(PRODUCTS.length);
    expect(component.find(Cart).length).toEqual(1);
  });
});

describe('Cart', () => {
  test('it should render', () => {
    const { component } = testRunner.getMountedInstance(
      Cart,
      {
        items: [testProduct]
      },
    );
    expect(component).toBeDefined();
    expect(component.find(CartCartItem).length).toEqual(1);
  });
});

describe('Product', () => {
  test('it should render', () => {
    const { component } = testRunner.getMountedInstance(
      Product,
      {
        item: testProduct,
        addedToCart: false,
      },
    );
    expect(component).toBeDefined();
    expect(component.find(ProductCartItem).length).toEqual(1);
    expect(component.find(CartActions).length).toEqual(1);
  });
});
