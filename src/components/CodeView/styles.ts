import styled from 'styled-components'

export const Container = styled.div`
  flex: 1;
  position: relative;
  height: 100%;
  padding: 16px;
  background: ${props => props.theme.backgrounds.darker};
  border-left: 1px solid ${props => props.theme.backgrounds.lightest};
`
export const BookIconContainer = styled.span`
  position: absolute;
  left: 50%;
  right: 15.81%;
  top: 44.11%;
  bottom: 44.78%;
  svg {
    width: 100px;
    height: 100px;
    stroke: #322d41;
    stroke-width: 1px;
  }
`
