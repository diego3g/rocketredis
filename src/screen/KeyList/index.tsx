import React, { memo } from 'react'
import { FiFolder } from 'react-icons/fi'

import { useWindowSize } from '../../hooks/useWindowSize'
import SearchInput from './SearchInput'
import {
  Container,
  Header,
  HeaderTitle,
  HeaderTextContainer,
  HeaderTotalKeys,
  KeyListContainer,
  Key,
  KeyTextContainer,
  KeyTitle,
  KeyChidrenCount
} from './styles'

const KeyList: React.FC = () => {
  const { width } = useWindowSize({ watch: false })

  return (
    <Container
      width={(width - 300) / 2}
      height={Infinity}
      minConstraints={[340, Infinity]}
      maxConstraints={[width - 300 - 100, Infinity]}
    >
      <Header>
        <HeaderTextContainer>
          <HeaderTitle>Localhost</HeaderTitle>
          <HeaderTotalKeys>132 keys</HeaderTotalKeys>
        </HeaderTextContainer>
        <SearchInput />
      </Header>

      <KeyListContainer>
        <Key>
          <KeyTextContainer>
            <KeyTitle>mail-queue</KeyTitle>
            {true && <KeyChidrenCount>(132 keys)</KeyChidrenCount>}
          </KeyTextContainer>

          {true && <FiFolder />}
        </Key>
        <Key>
          <KeyTextContainer>
            <KeyTitle>cache</KeyTitle>
            {true && <KeyChidrenCount>(25 keys)</KeyChidrenCount>}
          </KeyTextContainer>

          {true && <FiFolder />}
        </Key>
        <Key>
          <KeyTextContainer>
            <KeyTitle>single-key-without-children</KeyTitle>
            {false && <KeyChidrenCount>(132 keys)</KeyChidrenCount>}
          </KeyTextContainer>

          {false && <FiFolder />}
        </Key>
        <Key>
          <KeyTextContainer>
            <KeyTitle>another-key</KeyTitle>
            {false && <KeyChidrenCount>(132 keys)</KeyChidrenCount>}
          </KeyTextContainer>

          {false && <FiFolder />}
        </Key>
      </KeyListContainer>
    </Container>
  )
}

export default memo(KeyList)
