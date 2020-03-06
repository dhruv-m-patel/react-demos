import React from 'react';
import PropTypes from 'prop-types';
import FormGroup from 'react-bootstrap/FormGroup';
import styled from 'styled-components';

const Error = styled.span`
  display: block;
  margin: 0.2rem 0 1rem;
  color: red;
`;

export default function FormField({
  children,
  error,
  ...rest
}) {
  return (
    <FormGroup {...rest}>
      {children}
      {!!error && (
        <Error>{error}</Error>
      )}
    </FormGroup>
  );
}

FormField.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
};

FormField.defaultProps = {
  error: undefined,
};
