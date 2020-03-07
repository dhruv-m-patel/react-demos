import Tester from '../../../../tests/Tester';
import MovieSeatBooking, {Seat} from './MovieSeatBooking';

const testRunner = new Tester();

describe('MovieSeatBooking', () => {
  test('it should render', () => {
    const { component } = testRunner.getMountedInstance(MovieSeatBooking);
    expect(component).toBeDefined();
    expect(component.find(Seat).length).toEqual(3); // should render legends
  });
});
