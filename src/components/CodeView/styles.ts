import styled from 'styled-components'

export const Container = styled.div`
  flex: 1;
  height: 100%;
  padding: 16px;
  background: ${props => props.theme.colors.background.darker};
  border-left: 1px solid ${props => props.theme.colors.background.lightest};
`
