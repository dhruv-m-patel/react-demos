import Tester from '../../../../tests/Tester'
import TypingSpeedChecker from './TypingSpeedChecker';
import DifficultyLevel from './DifficultyLevel'
import Form from 'react-bootstrap/Form';
import Countdown from './Countdown'
import TypingSpeedTester from './TypingSpeedTester'

const testRunner = new Tester();

describe('TypingSpeedChecker', () => {
  test('it should render', () => {
    const { component } = testRunner.getMountedInstance(TypingSpeedChecker);
    expect(component).toBeDefined();
    expect(component.find(DifficultyLevel).length).toEqual(1);
  });
});

describe('DifficultyLevel', () => {
  test('it should render', () => {
    const { component } = testRunner.getMountedInstance(DifficultyLevel);
    expect(component).toBeDefined();
    expect(component.find(Form.Control).first().props().as).toEqual('select');
    expect(component.find(Form.Control).first().find('option').length).toEqual(4);
  });
});

describe('Countdown', () => {
  test('it should render', () => {
    const { component } = testRunner.getMountedInstance(Countdown, { minutes: 1 });
    expect(component).toBeDefined();
  });
});

describe('TypingSpeedTester', () => {
  test('it should render', () => {
    const { component } = testRunner.getMountedInstance(
      TypingSpeedTester,
      { difficultyLevel: 'easy' },
    );
    expect(component).toBeDefined();
    expect(component.find(Form.Control).first().props().type).toEqual('text');
  });
});
