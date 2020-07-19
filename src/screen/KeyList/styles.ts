import { ResizableBox } from 'react-resizable'

import { transparentize } from 'polished'
import styled, { css } from 'styled-components'

export const Container = styled(ResizableBox).attrs({
  resizeHandles: ['e'],
  axis: 'x'
})`
  height: 100%;
  padding: 24px;
  border-right: 1px solid ${props => props.theme.backgrounds.lightest};
  display: flex;
  flex-direction: column;
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

export const HeaderDatabaseDetails = styled.p`
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  color: #9696a7;
  margin-left: 8px;

  span + span {
    margin-left: 8px;
    padding-left: 8px;
    border-left: 1px solid rgba(255, 255, 255, 0.1);
  }
`

export const KeyListWrapper = styled.div`
  height: calc(100vh - 140px);
  overflow: auto;
  margin-top: 18px;
`

export const KeyListContainer = styled.section`
  position: relative;
`

export const Key = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;

  & + div {
    border-top: 1px solid rgba(225, 225, 230, 0.1);
  }

  button {
    background: transparent;
    border: 0;
    cursor: pointer;

    svg {
      color: ${props => props.theme.colors.grey};
      width: 14px;
      height: 14px;
    }

    &:hover svg {
      color: ${props => props.theme.colors.white};
    }
  }
`

interface KeyTextContainerProps {
  selected: boolean
}

export const KeyTextContainer = styled.button<KeyTextContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${props => props.theme.colors.white};

  ${props =>
    !props.selected &&
    css`
      &:hover {
        color: ${props => transparentize(0.2, props.theme.colors.pink)};
      }
    `}

  ${props =>
    props.selected &&
    css`
      color: ${props.theme.colors.pink};
    `}
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
