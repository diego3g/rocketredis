import React, { useState, useCallback, InputHTMLAttributes } from 'react'
import { useTranslation } from 'react-i18next'
import { FiSearch } from 'react-icons/fi'

import { Container } from './styles'

type SearchInputProps = InputHTMLAttributes<HTMLInputElement>

const SearchInput: React.FC<SearchInputProps> = ({ ...rest }) => {
  const [isFocused, setIsFocused] = useState(false)
  const { t } = useTranslation('keyList')

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false)
  }, [])

  return (
    <Container isFocused={isFocused} onFocus={handleInputFocus}>
      <FiSearch />
      <input placeholder={t('search')} {...rest} onBlur={handleInputBlur} />
    </Container>
  )
}

export default SearchInput
