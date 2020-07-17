import styled from 'styled-components'

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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
