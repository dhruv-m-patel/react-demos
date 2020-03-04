import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';

export default function PageNavigation({
  title
}) {
  return (
    <Container>
      <h2>
        <Link to="/">
          <FontAwesomeIcon icon={faHome} size="1x" />
        </Link>
        &nbsp;
        {title}
      </h2>
    </Container>
  );
}

PageNavigation.propTypes = {
  title: PropTypes.string.isRequired,
};
