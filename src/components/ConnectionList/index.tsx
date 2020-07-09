import { ipcRenderer } from 'electron'
import isElectron from 'is-electron'
import React, { useEffect } from 'react'
import { FiPlusCircle } from 'react-icons/fi'
import { useToggle } from 'react-use'

import NewConnectionModal from '../NewConnectionModal'
import { Container, Connections } from './styles'

const ConnectionList: React.FC = () => {
  const [isCreateModalOpen, toggleCreateModalOpen] = useToggle(false)

  useEffect(() => {
    if (isElectron()) {
      ipcRenderer.on('set-modal', () => {
        toggleCreateModalOpen(true)
      })
    }
  }, [])

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
            <strong>CONNECTIONS</strong>
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
