import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  padding: 1rem 0;
  background-color: #333;

  & a {
    font-size: 1rem;
    text-decoration: none;
    margin-bottom: 1rem;

    &:hover {
      text-decoration: underline;
      cursor: pointet;
    }
  }
`;

export default function Navigation() {
  return(
    <Nav>
      <Link to="/">Home</Link>
      &nbsp;&nbsp;
      <Link to="/redux">Redux Example</Link>
    </Nav>
  )
}
