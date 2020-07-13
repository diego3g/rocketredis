import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiPlusCircle } from 'react-icons/fi'
import { useToggle } from 'react-use'

import NewConnectionModal from '../NewConnectionModal'
import { Container, Connections } from './styles'

const ConnectionList: React.FC = () => {
  const [isCreateModalOpen, toggleCreateModalOpen] = useToggle(false)
  const { t } = useTranslation()

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
            <strong>{t('connectionList.title')}</strong>
            <button type="button" onClick={toggleCreateModalOpen}>
              <FiPlusCircle />
            </button>
          </header>
        </Connections>
      </Container>

      <NewConnectionModal
        visible={isCreateModalOpen}
        onRequestClose={toggleCreateModalOpen}
      />
    </>
  )
}

export default ConnectionList
