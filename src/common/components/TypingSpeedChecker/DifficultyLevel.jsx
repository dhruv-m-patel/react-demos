import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';

export default function DifficultyLevel({
  onChange,
}) {
  return (
    <Form.Control as="select" onChange={onChange}>
      <option value="">Select Difficuly Level</option>
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
    </Form.Control>
  );
}

DifficultyLevel.propTypes = {
  onChange: PropTypes.func,
};

DifficultyLevel.defaultProps = {
  onChange: () => {},
};
