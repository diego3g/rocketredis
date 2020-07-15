import React, { useState, useCallback } from 'react'
import { FiSearch } from 'react-icons/fi'

import { Container } from './styles'

const SearchInput: React.FC = ({ ...rest }) => {
  const [isFocused, setIsFocused] = useState(false)

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false)
  }, [])

  return (
    <Container isFocused={isFocused} onFocus={handleInputFocus}>
      <FiSearch />
      <input placeholder="Search..." {...rest} onBlur={handleInputBlur} />
    </Container>
  )
}

export default SearchInput
