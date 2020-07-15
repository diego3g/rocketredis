import React, { ButtonHTMLAttributes, memo } from 'react'
import { FiLoader } from 'react-icons/fi'

import { defaultTheme } from '../../styles/theme'
import { Container, Loading } from './styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  color: keyof typeof defaultTheme.colors
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
      {loading ? (
        <Loading>
          <FiLoader />
        </Loading>
      ) : (
        children
      )}
    </Container>
  )
}

export default memo(Button)
