import { Link } from 'react-router-dom';
import Tester from '../../../../tests/Tester'
import HomePage, { PROJECTS } from './HomePage';

const testRunner = new Tester();

describe('HomePage', () => {
  test('it should render', () => {
    const { component } = testRunner.getShallowInstance(HomePage);
    expect(component).toBeDefined();
    expect(component.find(Link).length).toEqual(PROJECTS.length * 3);
    PROJECTS.forEach((project, index) => {
      const link = component.find(Link).at((index + 1) * 3 - 2);
      expect(link.props().to).toEqual(project.link);
      expect(link.text()).toEqual(project.project);
    });
  });
});
