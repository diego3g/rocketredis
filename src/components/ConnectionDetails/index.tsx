import React from 'react'

import { useWindowSize } from '../../hooks/useWindowSize'
import { Container } from './styles'

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
