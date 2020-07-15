import { ResizableBox } from 'react-resizable'
import styled from 'styled-components'

export const Container = styled(ResizableBox).attrs({
  resizeHandles: ['e'],
  axis: 'x'
})`
  height: 100%;
  padding: 24px;
`
export const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const HeaderTextContainer = styled.section`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-right: 16px;
`

export const HeaderTitle = styled.p`
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
`

export const HeaderTotalKeys = styled.p`
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  color: #9696a7;
  margin-left: 8px;
`

export const KeyListContainer = styled.section`
  margin-top: 18px;
`

export const Key = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 0;

  &:not(:last-child) {
    border-bottom: 1px solid rgba(225, 225, 230, 0.1);
  }

  svg {
    color: #9696a7;
  }
`

export const KeyTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const KeyTitle = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
`

export const KeyChidrenCount = styled.p`
  font-weight: normal;
  font-size: 11px;
  line-height: 13px;
  color: #9696a7;
  margin-left: 4px;
`
