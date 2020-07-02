import React, { ButtonHTMLAttributes } from 'react'

import { Container, Loading } from './styles'
import { FiLoader } from 'react-icons/fi'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  color: 'grey' | 'opaque' | 'purple' | 'green' | 'orange' | 'pink' | 'cyan' | 'red' | 'yellow';
}

const Button: React.FC<ButtonProps> = ({
  children,
  color = 'pink',
  type = 'button',
  loading = false,
  ...rest
}) => {
  return (
    <Container disabled={loading} color={color} type={type} {...rest}>
      {loading
        ? (
          <Loading>
            <FiLoader />
          </Loading>
        )
        : children
      }
    </Container>
  )
}

export default Button
