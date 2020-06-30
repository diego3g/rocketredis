import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    color: #E1E1E6;
    background: transparent;
  }

  body, input, button {
    font: 400 16px Roboto, sans-serif;
  }

  strong, h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
  }

  .react-resizable {
    position: relative;
  }

  .react-resizable-handle {
    display: flex;
    justify-content: center;
    user-select: none;
    cursor: ew-resize;
    position: absolute;
    font-size: 24px;

    &::before {
      width: 1px;
      height: 24px;
      background: ${props => props.theme.colors.background.lightest};
      content: '';
    }
  }

  .react-resizable-handle-e { 
    right: 0;
    padding-right: 6px;
    top: 50%;
    transform: translateY(-50%);
  }
`
