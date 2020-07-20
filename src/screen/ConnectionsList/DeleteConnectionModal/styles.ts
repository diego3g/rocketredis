import styled from 'styled-components'

export const TextContent = styled.div`
  p:not(:last-child) {
    margin-bottom: 14px;
  }

  p:last-child {
    margin-bottom: 4px;
  }
`

export const ActionsContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 24px;

  button {
    padding: 10px 16px;
  }
`

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;

  button:first-child {
    margin-right: 8px;
  }
`
