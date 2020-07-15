import styled, { css, keyframes } from 'styled-components'

interface IContainerProps {
  connected: boolean
  errored: boolean
}

export const Container = styled.li<IContainerProps>`
  > button {
    width: 100%;
    padding: 16px;
    display: flex;
    align-items: center;
    background: transparent;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    border: 0;
    color: ${props => props.theme.colors.white};

    svg:first-child {
      width: 16px;
      height: 16px;
      margin-right: 8px;
    }

    > svg:last-child {
      visibility: hidden;
      opacity: 0;
      width: 14px;
      height: 14px;
      margin-left: auto;
      color: ${props => props.theme.colors.grey};

      transition: opacity 0.2s, visibility 0.2s;
    }

    ${props =>
      !props.connected &&
      !props.errored &&
      css`
        background: ${props => props.theme.backgrounds.darker};

        &:hover {
          background: ${props => props.theme.backgrounds.dark};

          svg {
            visibility: visible;
            opacity: 1;
          }
        }
      `}
  }

  ${props =>
    props.connected &&
    css`
      background: ${props => props.theme.colors.purple};
    `}

  ${props =>
    props.errored &&
    css`
      background: ${props => props.theme.colors.red};
    `}
`

export const DatabaseList = styled.div`
  padding-bottom: 8px;
`

interface DatabaseProps {
  connected: boolean
}

export const Database = styled.button<DatabaseProps>`
  width: 100%;
  padding: 8px 16px;
  display: flex;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  border: 0;
  color: ${props => props.theme.colors.white};
  transition: background-color 0.2s;

  cursor: pointer;

  strong {
    font-size: 13px;
    font-weight: 500;
  }

  span {
    font-size: 12px;
    opacity: 0.6;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.06);
  }

  ${props =>
    props.connected &&
    css`
      background: rgba(0, 0, 0, 0.1);
    `}
`

export const ConnectionError = styled.p`
  padding: 0 16px 16px;
  font-size: 14px;

  button {
    background: transparent;
    border: 0;
    color: inherit;
    text-decoration: underline;
    font-size: 14px;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.7;
    }
  }
`

const spinningAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

export const Loading = styled.div`
  svg {
    animation: 2s ${spinningAnimation} linear infinite;
  }
`
