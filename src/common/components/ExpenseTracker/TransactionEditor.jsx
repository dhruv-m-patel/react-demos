import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';

const Error = styled.p`
  color: red;
`;

export default function TransactionEditor({
  onSave,
  onCancel,
}) {
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const handleValueChanged = useCallback(({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.name === 'amount' ? Number(target.value) * 100 : target.value,
    });
    setFormErrors({
      ...formErrors,
      [target.name]: undefined,
    });
  }, [formValues, formErrors]);

  const handleOnSubmit = useCallback((e) => {
    e.preventDefault();

    const errors = {};
    if (!formValues.date) {
      errors.date = 'Please enter date';
    }

    if (!formValues.memo) {
      errors.memo = 'Please enter memo';
    }

    if (!formValues.type) {
      errors.type = 'Please specify transaction type';
    }

    if (!formValues.amount) {
      errors.amount = 'Please enter amount';
    }

    if (Object.keys(errors).length) {
      setFormErrors(errors);
      return;
    }

    onSave(formValues);
  }, [onSave, formValues]);

  const handleOnCancel = useCallback(() => {
    setFormValues({});
    setFormErrors({});
    onCancel();
  }, [onCancel]);

  return (
    <Form onSubmit={handleOnSubmit}>
      <Form.Group>
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" name="date" defaultValue={formValues.date} onChange={handleValueChanged} />
        {formErrors.date && (
          <Error>{formErrors.date}</Error>
        )}
      </Form.Group>
      <Form.Group>
        <Form.Label>Memo</Form.Label>
        <Form.Control as="textarea" rows={3} maxLength={200} name="memo" defaultValue={formValues.memo} onChange={handleValueChanged} />
        {formErrors.memo && (
          <Error>{formErrors.memo}</Error>
        )}
      </Form.Group>
      <Form.Group>
        <Form.Label>Is this income or expense?</Form.Label>
        <Form.Check type="radio" name="type" defaultValue="income" label="Income" onChange={handleValueChanged} />
        <Form.Check type="radio" name="type" defaultValue="expense" label="Expense" onChange={handleValueChanged} />
        {formErrors.type && (
          <Error>{formErrors.type}</Error>
        )}
      </Form.Group>
      <Form.Group>
        <Form.Label>Amount</Form.Label>
        <Form.Control type="number" name="amount" defaultValue={formValues.amount} onChange={handleValueChanged} />
        {formErrors.amount && (
          <Error>{formErrors.amount}</Error>
        )}
      </Form.Group>
      <Row>
        <Col sm={3}>
          <Button type="submit" variant="primary" block>
            Submit
          </Button>
        </Col>
        <Col sm={3}>
          <Button variant="outline-danger" block onClick={handleOnCancel}>
            Cancel
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

TransactionEditor.propTypes = {
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
};

TransactionEditor.defaultProps = {
  onSave: () => {},
  onCancel: () => {},
};
