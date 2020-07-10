import React from 'react'

import ConnectionsList from './ConnectionsList'
import Header from './Header'
import KeyContent from './KeyContent'
import KeyList from './KeyList'
import { Container, Content, CurrentConnection } from './styles'

const screen: React.FC = () => {
  return (
    <Container>
      <Header />
      <Content>
        <ConnectionsList />
        <CurrentConnection>
          <KeyList />
          <KeyContent />
        </CurrentConnection>
      </Content>
    </Container>
  )
}

export default screen
