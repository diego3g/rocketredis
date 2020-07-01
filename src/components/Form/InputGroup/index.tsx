import styled from 'styled-components'

export default styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  > div {
    margin-top: 0 !important;
  }

  div + div {
    margin-left: 16px;
  }
`
