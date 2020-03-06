import React from 'react';
import Tester from '../../../../tests/Tester';
import FormValidator from './FormValidator';
import FormField from './FormField';
import FormGroup from 'react-bootstrap/FormGroup';

const testRunner = new Tester();

describe('FormField', () => {
  test('it should render', () => {
    const { component } = testRunner.getMountedInstance(
      FormField,
      { children: (<h1>Foo</h1>) },
    );

    expect(component).toBeDefined();
    expect(component.find(FormGroup).length).toEqual(1);
    expect(component.find('h1').length).toEqual(1);
    expect(component.find('h1').at(0).childAt(0).text()).toEqual('Foo');
  });

  test('it should render error', () => {
    const { component } = testRunner.getMountedInstance(
      FormField,
      { children: (<h1>Foo</h1>), error: 'An error occurred' },
    );

    expect(component.find('span').at(0).text()).toEqual('An error occurred');
  });
});

describe('FormValidator', () => {
  test('it should render', () => {
    const { component } = testRunner.getMountedInstance(FormValidator);
    expect(component).toBeDefined();
  });
});
