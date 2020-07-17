import React from 'react'
import { FiBook } from 'react-icons/fi'

import { Container } from './styles'

interface EmptyContentProps {
  message: string
}

const EmptyContent: React.FC<EmptyContentProps> = ({ message }) => {
  return (
    <Container>
      <FiBook />
      <p>{message}</p>
    </Container>
  )
}

export default EmptyContent
