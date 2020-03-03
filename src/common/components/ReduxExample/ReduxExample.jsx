import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Page from '../Page';

const Error = styled.label`
  color: red;
`;

const LoadingMessage = styled.label`
  color: green;
`;

export default function ReduxExample({
  isFetching,
  error,
  data,
  fetchTestData,
}) {
  useEffect(() => {
    if (!isFetching && !error && (!data || !data.length)) {
      fetchTestData();
    }
  }, [isFetching, error, data]);

  return (
    <Page>
      <Row>
        <Col sm={{ offset: 1, span: 10 }} md={{ offset: 3, span: 6 }}>
          <h4>An example page showing Redux integration</h4>
          <br />
          <br />
          {isFetching && (
            <React.Fragment>
              <Spinner size="sm" />
              <LoadingMessage>Fetching data with redux...</LoadingMessage>
            </React.Fragment>
          )}
          {!!error && (
            <Error>Error fetching data</Error>
          )}
          {data && data.length > 0 && (
            <React.Fragment>
              <h5>Following data was fetched using Redux</h5>
              <ul>
                {data.map(item => <li key={item}>{item}</li>)}
              </ul>
            </React.Fragment>
          )}
          <br />
          <br />
          <Link to="/">View Home Page</Link>
        </Col>
      </Row>
    </Page>
  );
}

ReduxExample.propTypes = {
  isFetching: PropTypes.bool,
  error: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.string),
  fetchTestData: PropTypes.func,
};

ReduxExample.defaultProps = {
  isFetching: false,
  error: undefined,
  data: undefined,
  fetchTestData: () => {},
};
