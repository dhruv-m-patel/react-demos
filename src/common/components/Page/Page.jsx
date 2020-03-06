import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import store from 'store';
import styled, { createGlobalStyle } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons/faSun';
import { faMoon } from '@fortawesome/free-solid-svg-icons/faMoon';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import DefaultHelmet from '../DefaultHelmet';
import ReactLogoSpinner from '../ReactLogoSpinner/ReactLogoSpinner';

const GlobalStyle = createGlobalStyle`
  html {
    font-family: Helvetica, sans-serif;
    font-size: 14px;
    color: black;
    height: 100vh;

    & body h1 > a {
      font-size: 1.8rem;

      &:hover {
        text-decoration: none;
        color: inherit;
      }
    }
  }
`;

const DarkTheme = createGlobalStyle`
  body {
    background-color: #282c34;
    color: white;

    & .text {
      color: var(--white);
    }

    & a {
      color: #61dafb;
    }

    & header > h1 > a {
      color: white;
    }

    & table > thead > tr > th {
      color: white;
      font-weight: 1.1rem;
    }
  }
`;

const LightTheme = createGlobalStyle`
  body {
    background-color: white;
    color: black;

    & .text {
      color: black;
    }

    & a {
      color: blue;
    }

    & header > h1 > a{
      color: #333333;
    }
  }
`;

const Content = styled.div`
  margin:0;
  padding: 0;

  & a:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const NavLink = styled.div`
  float: right;

  &::after {
    clear: both;
  }
`;

const DarkModeTrigger = styled.span`
  cursor: pointer;
  padding-top: 10px;
  display: inline-block;
  height: 1em;
`;

const App = styled.div`
  text-align: left;
`;

const Navigation = styled.header`
  font-weight: bold;
  padding: 1rem;
`;

export default function Page({
  title,
  showHome,
  children,
}) {
  const [hasSwitchedToDarkMode, setHasSwitchedToDarkMode] = useState(undefined);

  const switchToDarkMode = useCallback(() => {
    setHasSwitchedToDarkMode(!hasSwitchedToDarkMode);
    store.set('enableDarkMode', !hasSwitchedToDarkMode);
  }, [hasSwitchedToDarkMode]);

  // Set dark mode initially based on whether user prefers it using os preferences or previously turned it on
  useEffect(() => {
    if (hasSwitchedToDarkMode === undefined) {
      let shouldSetDarkModeInitially = false;
      const darkModeSetting = store.get('enableDarkMode');
      if (darkModeSetting === undefined && typeof window !== 'undefined') {
        shouldSetDarkModeInitially = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      } else {
        shouldSetDarkModeInitially = darkModeSetting;
      }

      setHasSwitchedToDarkMode(shouldSetDarkModeInitially);
      store.set('enableDarkMode', shouldSetDarkModeInitially);
    }
  }, [hasSwitchedToDarkMode]);

  const Theme = hasSwitchedToDarkMode ? DarkTheme : LightTheme;

  return (
    <React.Fragment>
      <GlobalStyle />
      <Theme />
      <Content>
        <DefaultHelmet title={title} />
        <App>
          <Navigation>
            <NavLink>
              <DarkModeTrigger>
                <FontAwesomeIcon
                  icon={hasSwitchedToDarkMode ? faSun : faMoon}
                  size="2x"
                  onClick={switchToDarkMode}
                />
              </DarkModeTrigger>
            </NavLink>
            <h1>
              <Link to="/">
                {showHome ? <FontAwesomeIcon icon={faHome} /> : <ReactLogoSpinner />}
                {showHome && <span>&nbsp;</span>}
                {title}
              </Link>
            </h1>
          </Navigation>
          <br />
          <Container>
            {children}
          </Container>
        </App>
      </Content>
    </React.Fragment>
  );
}

Page.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  showHome: PropTypes.bool,
};

Page.defaultProps = {
  title: 'React Demos',
  children: undefined,
  showHome: false,
}
