import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* https://github.com/Lazzzer00/Best-CSS-Reset-2024/blob/main/css_reset.css */
  *, *::before, *::after {
    box-sizing: border-box; 
  }

  * { 
    padding: 0;
    margin: 0; 
  }

  ul[role='list'], ol[role='list'] {
    list-style: none;
  }

  li {
    list-style-type: none;
  }

  html:focus-within{
    scroll-behavior: smooth; 
  }

  a:not([class]) {
    text-decoration-skip-ink: auto; 
  }

  a { 
    color: inherit;
    text-decoration: none;
  }

  img, picture, svg, video, canvas {
    max-width: 100%;
    height: auto; 
    font-style: italic; 
    vertical-align: middle; 
    background-repeat: no-repeat; 
    background-size: cover;
  }

  @media (prefers-reduced-motion: reduce) {
    html:focus-within {
      scroll-behavior: auto;
    }

    *, *::before, *::after {
      transition: none;
      transition-duration: 0.01ms !important;
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      scroll-behavior: auto !important;
    }
  }

  /* custom styles */
  input, button, textarea, select {
    all: unset;
  }

  body, html {
    height: 100%; 
    scroll-behavior: smooth; 
  }

  body {
    font-family: 'SUIT Variable';
    color: ${(props) => props.theme.colors.primary[400]};
  }

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.secondary[200]};
    border-radius: 10px;
  }

  body::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.secondary[100]};
  }

  body::-webkit-scrollbar-button:vertical:start:decrement {
    height: ${(props) => props.theme.heights.header.mobile};
  }

  @media ${(props) => props.theme.breakpoints.tablet} {
    ::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }

    body::-webkit-scrollbar-button:vertical:start:decrement {
      height: ${(props) => props.theme.heights.header.tablet};
    }
  }
`;

export default GlobalStyle;
