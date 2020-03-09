import Tester from '../../../../tests/Tester'
import ShoppingCart, {PRODUCTS} from './ShoppingCart';
import Product from './Product'
import Cart from './Cart'

const testRunner = new Tester();

describe('ShoppingCart', () => {
  test('it should render', () => {
    const { component } = testRunner.getMountedInstance(ShoppingCart);
    expect(component).toBeDefined();
    expect(component.find(Product).length).toEqual(PRODUCTS.length);
    expect(component.find(Cart).length).toEqual(1);
  });
});
