import styled from 'styled-components'
import { ResizableBox } from 'react-resizable'

export const Container = styled(ResizableBox).attrs({
  height: Infinity,
  minConstraints: [340, Infinity],
  maxConstraints: [Infinity, Infinity],
  resizeHandles: ['e'],
  axis: 'x'
})`
  height: 100%;
  padding: 16px;
`
