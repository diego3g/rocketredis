import styled from 'styled-components'
import { ResizableBox } from 'react-resizable'

export const Container = styled(ResizableBox).attrs({
  resizeHandles: ['e'],
  axis: 'x'
})`
  height: 100%;
  padding: 16px;
`
