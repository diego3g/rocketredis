import { animated } from 'react-spring'

import styled, { css } from 'styled-components'

interface ContainerProps {
  type: 'success' | 'error' | 'info'
}

const toastTypes = {
  info: css`
    background: #ebf8ff;
    color: #3172b7;
  `,
  success: css`
    background: #e6fffa;
    color: #2e656a;
  `,
  error: css`
    background: #fddede;
    color: #c53030;
  `
}

export const Container = styled(animated.div)<ContainerProps>`
  margin-bottom: 16px;
  width: 320px;

  position: relative;
  padding: 16px 30px 16px 16px;
  margin: 0 24px 8px 0;
  border-radius: 4px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

  display: flex;

  ${props => toastTypes[props.type]}

  &:first-child {
    margin-top: 24px;
  }

  svg {
    margin: 3px 12px 0 0;
  }

  div {
    flex: 1;
    margin-right: 16px;

    strong {
      font-size: 14px;
      font-weight: 500;
    }

    p {
      margin-top: 4px;
      font-size: 12px;
      opacity: 0.7;
      line-height: 18px;
    }
  }

  button {
    position: absolute;
    right: 8px;
    top: 18px;
    opacity: 0.6;
    border: 0;
    background: transparent;
    color: inherit;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
      opacity: 1;
    }
  }
`
