import styled from 'styled-components'

export default styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 16px;

  > div {
    margin-top: 0 !important;
  }

  div + div {
    margin-left: 16px;
  }
`
