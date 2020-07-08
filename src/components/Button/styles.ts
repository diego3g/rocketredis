import styled, { keyframes } from 'styled-components'

import { defaultTheme } from '../../styles/theme'

interface ContainerProps {
  color: keyof typeof defaultTheme.colors
}

export const Container = styled.button<ContainerProps>`
  background: ${props => props.theme.colors[props.color]};
  border: 0;
  border-radius: 4px;
  color: #fff;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 600;
  font-size: 14px;

  cursor: pointer;
  transition: opacity 0.2s;

  svg {
    margin-right: 8px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5 !important;
  }

  &:hover {
    opacity: 0.8;
  }
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

export const Loading = styled.div`
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  animation: ${rotate} 2s linear infinite;

  svg {
    margin: 0;
    height: 16px;
    width: 16px;
  }
`
