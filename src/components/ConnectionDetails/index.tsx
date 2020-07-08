import React from 'react'

import { Container } from './styles'
import { useWindowSize } from '../../hooks/useWindowSize'

const ConnectionDetails: React.FC = () => {
  const { width } = useWindowSize({ watch: false })

  return (
    <Container
      width={(width - 300) / 2}
      height={Infinity}
      minConstraints={[340, Infinity]}
      maxConstraints={[width - 300 - 100, Infinity]}
    >
      asd
    </Container>
  )
}

export default ConnectionDetails
