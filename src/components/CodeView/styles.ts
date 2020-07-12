import styled from 'styled-components'

export const Container = styled.div`
  flex: 1;
  height: 100%;
  padding: 16px;
  padding-top: 8px;
  background: ${props => props.theme.colors.background.darker};
  border-left: 1px solid ${props => props.theme.colors.background.lightest};
`

export const TitleHeader = styled.div`
  font-size: 10px;
  opacity: .2

`

export const ContentContainer = styled.div`
  margin-top: 8px;
`