import styled from 'styled-components'
import { ResizableBox } from 'react-resizable'

export const Container = styled(ResizableBox).attrs({
  resizeHandles: ['e'],
  axis: 'x'
})`
  height: 100%;
  padding: 16px;
  padding-top: 8px;
`

export const TitleHeader = styled.div`
  font-size: 10px;
  opacity: .2

`

export const ContentContainer = styled.div`
  margin-top: 8px;
`