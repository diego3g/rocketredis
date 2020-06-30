import styled from 'styled-components'
import { ResizableBox } from 'react-resizable'

export const Container = styled(ResizableBox).attrs({
  width: 300,
  height: Infinity,
  minConstraints: [240, Infinity],
  maxConstraints: [Infinity, Infinity],
  resizeHandles: ['e'],
  axis: 'x'
})`
  background: ${props => props.theme.colors.background.darker};
  border-right: 1px solid ${props => props.theme.colors.background.lightest};
`

export const Connections = styled.div`
  padding: 16px;
  
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    strong {
      font-size: 12px;
      color: ${props => props.theme.colors.grey};
    }
    
    button {
      background: transparent;
      border: 0;
      color: ${props => props.theme.colors.grey};

      svg {
        width: 14px;
        height: 14px;
      }
    }
  }
`
