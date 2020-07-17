import React, {
  memo,
  useState,
  useEffect,
  useRef,
  useCallback,
  ChangeEvent,
  useMemo
} from 'react'
import { useDebounce } from 'react-use'
import { useVirtual } from 'react-virtual'

import { useRecoilState } from 'recoil'

import {
  currentConnectionState,
  currentDatabaseState,
  currentKeyState
} from '../../atoms/connections'
import EmptyContent from '../../components/EmptyContent'
import { useWindowSize } from '../../hooks/useWindowSize'
import { loadKeysFromDatabase } from '../../services/database/LoadKeysFromDatabase'
import SearchInput from './SearchInput'
import {
  Container,
  Header,
  HeaderTitle,
  HeaderTextContainer,
  HeaderDatabaseDetails,
  KeyListWrapper,
  KeyListContainer,
  Key,
  KeyTextContainer,
  KeyTitle
} from './styles'

const KeyList: React.FC = () => {
  const parentRef = useRef(null)

  const { width } = useWindowSize({ watch: false })

  const [searchInputValue, setSearchInputValue] = useState('')
  const [filter, setFilter] = useState('')
  const [keys, setKeys] = useState<string[]>([])

  const [currentConnection] = useRecoilState(currentConnectionState)
  const [currentDatabase] = useRecoilState(currentDatabaseState)
  const [currentKey, setCurrentKey] = useRecoilState(currentKeyState)

  useDebounce(
    () => {
      setFilter(searchInputValue)
    },
    500,
    [searchInputValue]
  )

  const filteredKeys = useMemo(() => {
    if (!filter) {
      return keys
    }

    return keys.filter(key => key.includes(filter))
  }, [filter, keys])

  const rowVirtualizer = useVirtual({
    size: filteredKeys.length,
    parentRef,
    estimateSize: useCallback(() => 33, [])
  })

  const handleSearchInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchInputValue(e.target.value)
    },
    []
  )

  const handleSelectKey = useCallback((key: string) => {
    setCurrentKey(key)
  }, [])

  useEffect(() => {
    if (currentDatabase) {
      loadKeysFromDatabase().then(loadedKeys => {
        setKeys(loadedKeys)
      })
    }
  }, [currentDatabase])

  return (
    <Container
      width={(width - 300) / 2}
      height={Infinity}
      minConstraints={[500, Infinity]}
      maxConstraints={[width - 300 - 100, Infinity]}
    >
      {currentDatabase ? (
        <>
          <Header>
            <HeaderTextContainer>
              <HeaderTitle>{currentConnection?.name}</HeaderTitle>
              <HeaderDatabaseDetails>
                <span>{currentDatabase?.name}</span>
                <span>{currentDatabase?.keys} keys</span>
              </HeaderDatabaseDetails>
            </HeaderTextContainer>
            <SearchInput
              onChange={handleSearchInputChange}
              value={searchInputValue}
            />
          </Header>

          <KeyListWrapper ref={parentRef}>
            <KeyListContainer
              style={{
                height: `${rowVirtualizer.totalSize}px`
              }}
            >
              {rowVirtualizer.virtualItems.map(virtualRow => {
                const key = filteredKeys[virtualRow.index]

                return (
                  <Key
                    key={virtualRow.index}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start}px)`
                    }}
                  >
                    <KeyTextContainer
                      selected={currentKey === key}
                      onClick={() => handleSelectKey(key)}
                    >
                      <KeyTitle>{key}</KeyTitle>
                    </KeyTextContainer>
                  </Key>
                )
              })}
            </KeyListContainer>
          </KeyListWrapper>
        </>
      ) : (
        <EmptyContent message="No database selected" />
      )}
    </Container>
  )
}

export default memo(KeyList)
