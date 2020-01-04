import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 14px;
  }

  h1 {
    font-size: 2.15rem;
    font-weight: 500;
  }

  h2 {
    font-size: 1.75rem;
    font-weight: 400;
    letter-spacing: 0.075em;
  }

  h3 {
    font-size: 1.65rem;
    letter-spacing: 0.05em;
  }

  h4 {
    font-size: 1.5rem;
    letter-spacing: 0.05em;
  }

  h5 {
    font-size: 1.35rem;
    letter-spacing: 0.05em;
  }

  h6 {
    font-size: 1.15rem;
  }

  p {
    font-size: 1rem;
  }

  strong {
    font-size: inherit;
  }
`;

export default GlobalStyles;
