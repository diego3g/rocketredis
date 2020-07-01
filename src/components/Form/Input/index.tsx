import React, { InputHTMLAttributes, useRef, useEffect } from 'react'
import { useField } from '@unform/core'

import { Container } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, name, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { fieldName, registerField, defaultValue, error } = useField(name)

  useEffect(() => {
    if (inputRef.current) {
      registerField({
        name: fieldName,
        path: 'value',
        ref: inputRef.current
      })
    }
  }, [])

  return (
    <Container>
      { label && <label htmlFor={fieldName}>{label}</label> }

      <input
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
    </Container>
  )
}

export default Input
