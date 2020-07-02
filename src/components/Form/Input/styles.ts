import styled from 'styled-components'

export const Container = styled.div`
  flex: 1;
  margin-top: 16px;

  &:first-child {
    margin: 0;
  }

  label {
    display: block;
    color: ${props => props.theme.colors.white};
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 8px;
  }

  input {
    height: 42px;
    border-radius: 4px;
    width: 100%;
    border: 0;
    font-size: 16px;
    color: ${props => props.theme.colors.white};
    padding: 0 16px;
    background: ${props => props.theme.colors.background.darkest};
    border: 1px solid ${props => props.theme.colors.background.lighter};

    transition: border 0.2s;

    &:focus {
      border-color: ${props => props.theme.colors.purple};
      outline: 0;
    }

    ::placeholder {
      color: ${({ theme }) => theme.colors.opaque};
    }

    &:disabled {
      cursor: not-allowed;
      color: ${({ theme }) => theme.colors.opaque};
    }
  }
`
