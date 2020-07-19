import styled, { css } from 'styled-components'

interface InputContainerProps {
  isFocused: boolean
}

export const Container = styled.div<InputContainerProps>`
  flex: 1;
  display: flex;
  align-items: center;
  max-width: 260px;
  border-radius: 4px;
  background: ${props => props.theme.backgrounds.darkest};
  border: 1px solid #322d41;

  padding: 7px 12px;

  transition: border 0.2s;

  &:first-child {
    margin: 0;
  }

  svg {
    width: 14px;
    height: 14px;
    margin-right: 8px;
    color: #9696a7;
  }

  input {
    width: 100%;
    border: 0;
    font-size: 14px;
    line-height: 16px;
    color: ${props => props.theme.colors.white};
    background: transparent;
    flex: 1;

    ::placeholder {
      color: #9696a7;
    }

    &:disabled {
      cursor: not-allowed;
      color: ${({ theme }) => theme.colors.opaque};
    }
  }

  ${props =>
    props.isFocused &&
    css`
      border-color: ${props => props.theme.colors.purple};
      outline: 0;
    `}
`
