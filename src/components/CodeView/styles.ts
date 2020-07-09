import styled from 'styled-components'

export const Container = styled.div`
  flex: 1;
  display: flex;
  position: relative;
  height: 100%;
  padding: 16px;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.backgrounds.darker};
`

export const BookIconContainer = styled.div`
  positon: absolute;
  text-align: center;
  svg {
    width: 100px;
    height: 100px;
    stroke: #322d41;
    stroke-width: 1px;
  }

  p {
    padding-top: 5px;
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    color: #322d41;
  }
`
