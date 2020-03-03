import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import store from 'store';
import styled, { createGlobalStyle, keyframes } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOn } from '@fortawesome/free-solid-svg-icons/faToggleOn';
import { faToggleOff } from '@fortawesome/free-solid-svg-icons/faToggleOff';
import Container from 'react-bootstrap/Container';
import DefaultHelmet from '../DefaultHelmet';

const DarkTheme = createGlobalStyle`
  body {
    background-color: #282c34;
    color: white;

    & a {
      color: #61dafb;
    }

    & .text {
      color: var(--white);
    }
  }
`;

const LightTheme = createGlobalStyle`
  body {
    background-color: white;
    color: black;

    & a {
      color: blue;
    }

    & .text {
      color: black;
    }
  }
`;

const GlobalStyle = createGlobalStyle`
  html {
    font-family: Helvetica, sans-serif;
    font-size: 14px;
    color: black;
    height: 100vh;
  }
`;

const Content = styled.div`
  margin:0;
  padding: 0;

  & a:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  & h1 {
    color: #333;
  }
`;

const TextLeft = styled.div`
  text-align: left;
`;

const TextRight = styled.div`
  text-align: right;
`;

const DarkModeTrigger = styled.span`
  cursor: pointer;
  padding-top: 10px;
  display: inline-block;
  height: 1em;
`;

const App = styled.div`
  text-align: center;
`;

const AppLogoAnimation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const AppLogo = styled.img`
  animation: 20s ${AppLogoAnimation} infinite linear;
  height: 40vmin;
  pointer-events: none;
`;

const AppHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
`;

export default function Page({
  title,
  description,
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
        <DefaultHelmet title={title} description={description} />
        <TextRight>
          Dark Mode
          &nbsp;
          <DarkModeTrigger>
            <FontAwesomeIcon
              icon={hasSwitchedToDarkMode ? faToggleOn : faToggleOff}
              size="2x"
              onClick={switchToDarkMode}
            />
          </DarkModeTrigger>
        </TextRight>
        <App>
          <AppHeader>
            <AppLogo src="/images/logo.svg" alt="logo" />
            <h2>Styled React App</h2>
            <small>A universal react app with styled-component support.</small>
          </AppHeader>
          <br />
          <br />
          <Container>
            <TextLeft>
              {children}
            </TextLeft>
          </Container>
        </App>
      </Content>
    </React.Fragment>
  );
}

Page.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
};

Page.defaultProps = {
  title: undefined,
  description: undefined,
  children: undefined,
}
