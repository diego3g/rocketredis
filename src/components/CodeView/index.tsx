import React, { memo } from 'react'
import { FiBook } from 'react-icons/fi'

import { Container } from './styles'

const CodeView: React.FC = () => {
  return (
    <Container>
      <FiBook />
      <p>No Key Selected</p>
    </Container>
  )
}

export default memo(CodeView)
