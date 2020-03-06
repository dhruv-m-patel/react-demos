import React, { useState, useCallback } from 'react';
import validator from 'validator';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import FormField from './FormField';
import Page from '../Page';

export default function FormValidator() {
  const [success, setSuccess] = useState(false);
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
  });

  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
  });

  const onValueChanged = useCallback(({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });

    setFormErrors({
      ...formErrors,
      [target.name]: '',
    });
  }, [formValues, formErrors]);

  const onFormSubmitted = useCallback((e) => {
    e.preventDefault();

    const errors = {};

    if (validator.isEmpty(formValues.firstName)) {
      errors.firstName = 'First name is required';
    }

    if (validator.isEmpty(formValues.lastName)) {
      errors.lastName = 'Last name is required';
    }

    if (validator.isEmpty(formValues.email) || !validator.isEmail(formValues.email)) {
      errors.email = 'A valid email is required';
    }

    if (validator.isEmpty(formValues.birthDate)) {
      errors.birthDate = 'Birth date is required';
    }

    if (validator.isEmpty(formValues.password)) {
      errors.password = 'Password is required';
    } else if (formValues.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }

    if (validator.isEmpty(formValues.confirmPassword)) {
      errors.confirmPassword = 'You have not confirmed password';
    } else if (formValues.password !== formValues.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length) {
      setFormErrors(errors);
    } else {
      setSuccess(true);
    }
  }, [formValues]);

  return (
    <Page title="Form Validator" showHome>
      {success
        ? (
          <Alert variant="success">
            <Alert.Heading>Success!</Alert.Heading>
            There were no errors found in form.
          </Alert>
        )
        : (
          <Form onSubmit={onFormSubmitted}>
            <Row>
              <Col sm={6}>
                <FormField error={formErrors.firstName}>
                  <Form.Control type="text" size="lg" name="firstName" value={formValues.firstName} onChange={onValueChanged} placeholder="First Name" />
                </FormField>
              </Col>
              <Col sm={6}>
                <FormField error={formErrors.lastName}>
                <Form.Control type="text" size="lg" name="lastName" value={formValues.lastName} onChange={onValueChanged} placeholder="Last Name" />
                </FormField>
              </Col>
            </Row>
            <FormField error={formErrors.email}>
              <Form.Control type="email" size="lg" name="email" value={formValues.email} onChange={onValueChanged} placeholder="Email" />
            </FormField>
            <FormField error={formErrors.birthDate}>
              <Form.Control type="date" size="lg" name="birthDate" value={formValues.birthDate} onChange={onValueChanged} placeholder="Birth date" />
            </FormField>
            <FormField error={formErrors.password}>
              <Form.Control type="password" size="lg" name="password" value={formValues.password} onChange={onValueChanged} placeholder="Password" />
            </FormField>
            <FormField error={formErrors.password}>
              <Form.Control type="password" size="lg" name="confirmPassword" value={formValues.confirmPassword} onChange={onValueChanged} placeholder="Confirm Password" />
            </FormField>
            <Button type="submit" variant="primary" size="lg" block>
              Submit
            </Button>
          </Form>
        )}
    </Page>
  );
}
