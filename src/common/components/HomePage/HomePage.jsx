import React from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Page from '../Page';

export default function HomePage() {
  return (
    <Page>
      <Row>
        <Col sm={{ offset: 1, span: 10 }} md={{ offset: 4, span: 4 }}>
          <h5>React Demos</h5>
        </Col>
      </Row>
    </Page>
  );
}
