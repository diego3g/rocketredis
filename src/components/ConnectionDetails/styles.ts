import styled from 'styled-components'
import { ResizableBox } from 'react-resizable'

export const Container = styled(ResizableBox).attrs({
  width: 460,
  height: Infinity,
  minConstraints: [340, Infinity],
  maxConstraints: [Infinity, Infinity],
  resizeHandles: ['e'],
  axis: 'x'
})`
  flex: 1;
  height: 100%;
  padding: 16px;
`
