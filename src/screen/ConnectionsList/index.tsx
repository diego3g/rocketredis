import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { FiPlusCircle } from 'react-icons/fi'
import { useToggle } from 'react-use'

import { useRecoilState } from 'recoil'

import { connectionsState } from '../../atoms/connections'
import Connection from './Connection'
import NewConnectionModal from './NewConnectionModal'
import { Container, Connections } from './styles'

const ConnectionsList: React.FC = () => {
  const [connections] = useRecoilState(connectionsState)
  const [isCreateModalOpen, toggleCreateModalOpen] = useToggle(false)
  const { t } = useTranslation('connectionList')

  return (
    <>
      <Container
        width={300}
        height={Infinity}
        minConstraints={[240, Infinity]}
        maxConstraints={[300, Infinity]}
        className="app-sidebar"
      >
        <Connections>
          <header>
            <strong>{t('title')}</strong>
            <button type="button" onClick={toggleCreateModalOpen}>
              <FiPlusCircle />
            </button>
          </header>

          <ul>
            {connections.map(connection => (
              <Connection key={connection.name} connection={connection} />
            ))}
          </ul>
        </Connections>
      </Container>

      <NewConnectionModal
        visible={isCreateModalOpen}
        onRequestClose={toggleCreateModalOpen}
      />
    </>
  )
}

export default memo(ConnectionsList)
