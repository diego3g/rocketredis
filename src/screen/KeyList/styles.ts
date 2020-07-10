import { ResizableBox } from 'react-resizable'
import styled from 'styled-components'

export const Container = styled(ResizableBox).attrs({
  resizeHandles: ['e'],
  axis: 'x'
})`
  height: 100%;
  padding: 16px;
`
