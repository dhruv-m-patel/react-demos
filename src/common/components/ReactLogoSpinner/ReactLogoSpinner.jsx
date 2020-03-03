import React from 'react';
import styled, { keyframes } from 'styled-components';

export default function ReactLogoSpinner() {
  const AppLogoAnimation = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  `;

  const AppLogo = styled.img`
    animation: 20s ${AppLogoAnimation} infinite linear;
    max-width: 40px;
    display: inline;
    margin-right: 1rem;
  `;

  return (
    <AppLogo src="/images/logo.svg" />
  );
}
