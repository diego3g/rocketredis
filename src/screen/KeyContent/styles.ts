import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 16px;
  background: ${props => props.theme.backgrounds.darker};

  svg {
    width: 150px;
    height: 120px;
    stroke: #322d41;
    stroke-width: 0.8px;
  }

  p {
    margin-top: 14px;
    font-size: 20px;
    font-weight: bold;
    color: #322d41;

    text-align: center;
  }
`
