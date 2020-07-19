import { ResizableBox } from 'react-resizable'

import styled from 'styled-components'

export const Container = styled(ResizableBox).attrs({
  resizeHandles: ['e'],
  axis: 'x'
})`
  background: ${props => props.theme.backgrounds.darker};
  border-right: 1px solid ${props => props.theme.backgrounds.lightest};
`

export const Connections = styled.div`
  header {
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    strong {
      font-size: 12px;
      font-weight: 500;
      color: ${props => props.theme.colors.grey};
    }

    button {
      background: transparent;
      border: 0;
      color: ${props => props.theme.colors.grey};
      padding: 4px;

      display: flex;
      align-items: center;
      justify-content: center;

      cursor: pointer;
      transition: color 0.2s;

      svg {
        width: 14px;
        height: 14px;
      }

      &:hover {
        color: ${props => props.theme.colors.green};
      }
    }
  }

  ul {
    list-style: none;
  }
`
