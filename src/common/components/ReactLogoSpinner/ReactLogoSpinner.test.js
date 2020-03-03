import Tester from '../../../../tests/Tester';
import ReactLogoSpinner from './ReactLogoSpinner';

const tester = new Tester();

describe('ReactLogoSpinner', () => {
  test('it should render', () => {
    const { component } = tester.getMountedInstance(ReactLogoSpinner);
    expect(component).toBeDefined();
  });
});
