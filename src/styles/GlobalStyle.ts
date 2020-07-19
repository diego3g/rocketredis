import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    color: #E1E1E6;
    background: transparent;
    -webkit-font-smoothing: antialiased;
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
      background: rgba(255, 255, 255, 0.1);
      content: '';
    }
  }

  .react-resizable-handle-e {
    right: 0;
    padding-right: 6px;
    top: 50%;
    transform: translateY(-50%);
  }

  .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.3);

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-content {
    width: 500px;
    background: ${props => props.theme.backgrounds.dark};
    border: 1px solid #322D41;
    padding: 16px;
    border-radius: 4px;
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.3);

    &:focus {
      outline: 0;
    }
  }

  ::-webkit-scrollbar {
    width: 8px;

    border-radius: 4px;
    background: rgba(255, 255, 255, 0.05);
  }
  
  ::-webkit-scrollbar-track {
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
`
