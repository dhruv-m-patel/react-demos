import React from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Page from '../Page';
import styled from 'styled-components';

export const PROJECTS = [
  { project: 'Form Validator', link: '/form-validator' },
  { project: 'Movie Seat Booking', link: '/movie-seat-booking' },
  { project: 'Shopping Cart', link: '/shopping-cart' },
  { project: 'Expense Tracker', link: '/expense-tracker' },
  { project: 'Typing Speed Check', link: '/typing-speed-checker' },
];

const Paragraph = styled.p`
  text-align: center;
  font-size: 1.2rem;
`;

export default function HomePage() {
  return (
    <Page>
      <Paragraph>Click to see a React demo in action</Paragraph>
      <Row>
        <Col sm={{ offset: 1, span: 10 }} md={{ offset: 2, span: 8 }}>
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Project</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {PROJECTS.map(({ project, link }, index) => (
                <tr key={project}>
                  <td><Link to={link}>{index + 1}</Link></td>
                  <td><Link to={link}>{project}</Link></td>
                  <td><Link to={link}>{link}</Link></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Page>
  );
}
