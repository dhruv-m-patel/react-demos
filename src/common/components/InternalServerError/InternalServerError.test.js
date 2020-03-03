import Tester from '../../../../tests/Tester';
import InternalServerError from './InternalServerError';

const tester = new Tester();

describe('InternalServerError', () => {
  test('it should render', () => {
    const snapshot = tester.getSnapshot(InternalServerError);
    expect(snapshot).toMatchSnapshot();
  });
});
