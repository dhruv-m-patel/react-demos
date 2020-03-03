import Tester from '../../../../tests/Tester';
import Navigation from './Navigation';

const tester = new Tester();

describe('Navigation', () => {
  test('it should render', () => {
    const snapshot = tester.getSnapshot(Navigation);
    expect(snapshot).toMatchSnapshot();
  });
});
