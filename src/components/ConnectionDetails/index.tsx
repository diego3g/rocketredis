import React from 'react'

import { Container } from './styles'
import { useWindowSize } from '../../hooks/useWindowSize'

const ConnectionDetails: React.FC = () => {
  const { width } = useWindowSize()

  return (
    <Container width={(width - 300) / 2}>
      asd
    </Container>
  )
}

export default ConnectionDetails
