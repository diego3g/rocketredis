import React, { memo } from 'react'
import { FiBook } from 'react-icons/fi'

import { Container } from './styles'

const KeyContent: React.FC = () => {
  return (
    <Container>
      <FiBook />
      <p>No Key Selected</p>
    </Container>
  )
}

export default memo(KeyContent)
