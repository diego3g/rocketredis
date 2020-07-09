import React from 'react'
import { FiBook } from 'react-icons/fi'

import { Container, BookIconContainer } from './styles'

const CodeView: React.FC = () => {
  return (
    <Container>
      <BookIconContainer>
        <FiBook></FiBook>
        <p>No key Selected</p>
      </BookIconContainer>
    </Container>
  )
}

export default CodeView
