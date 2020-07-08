import styled, { css } from 'styled-components'

import { defaultTheme } from '../../../styles/theme'

interface InputContainerProps {
  isFocused: boolean
  isErrored: boolean
}

export const Container = styled.div`
  flex: 1;
  margin-top: 16px;

  &:first-child {
    margin: 0;
  }

  input {
    width: 100%;
    border: 0;
    font-size: 16px;
    color: ${props => props.theme.colors.white};
    background: transparent;
    flex: 1;

    ::placeholder {
      color: ${({ theme }) => theme.colors.opaque};
    }

    &:disabled {
      cursor: not-allowed;
      color: ${({ theme }) => theme.colors.opaque};
    }
  }
`

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 8px;

  small {
    font-size: 11px;
    line-height: 13px;
    margin-left: 8px;
  }

  label {
    display: block;
    color: ${props => props.theme.colors.white};
    font-size: 14px;
    font-weight: 600;
  }
`

export const InputContainer = styled.span<InputContainerProps>`
  display: flex;
  align-items: center;

  height: 42px;
  border-radius: 4px;
  background: ${props => props.theme.backgrounds.darkest};
  border: 1px solid ${props => props.theme.backgrounds.lighter};

  padding: 0 16px;

  transition: border 0.2s;

  svg {
    width: 20px;
    height: 20px;
    margin-left: 8px;
    color: ${defaultTheme.colors.red};
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: ${defaultTheme.colors.red};
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: ${props => props.theme.colors.purple};
      outline: 0;
    `}
`
