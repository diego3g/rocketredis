import React, { ButtonHTMLAttributes } from 'react'

import { Container } from './styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: 'grey' | 'opaque' | 'purple' | 'green' | 'orange' | 'pink' | 'cyan' | 'red' | 'yellow';
}

const Button: React.FC<ButtonProps> = ({ children, color = 'pink', type = 'button', ...rest }) => {
  return (
    <Container color={color} type={type} {...rest}>
      {children}
    </Container>
  )
}

export default Button
