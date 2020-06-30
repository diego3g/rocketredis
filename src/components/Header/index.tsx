import React, { useCallback } from 'react'
import { remote } from 'electron'
import { FiX, FiMinus, FiMaximize2 } from 'react-icons/fi'

import { Container, WindowActions, WindowActionButton } from './styles'

const Header: React.FC = () => {
  const handleCloseWindow = useCallback(() => {
    const window = remote.getCurrentWindow()

    window.close()
  }, [])

  const handleMaximize = useCallback(() => {
    const window = remote.getCurrentWindow()

    if (!window.isMaximized()) {
      window.maximize()
    } else {
      window.unmaximize()
    }
  }, [])

  const handleMinimize = useCallback(() => {
    const window = remote.getCurrentWindow()

    window.minimize()
  }, [])

  return (
    <Container>
      <strong>Rocket Redis</strong>

      <WindowActions>
        <WindowActionButton color="close" onClick={handleCloseWindow}>
          <FiX />
        </WindowActionButton>
        <WindowActionButton color="minimize" onClick={handleMinimize}>
          <FiMinus />
        </WindowActionButton>
        <WindowActionButton color="maximize" onClick={handleMaximize}>
          <FiMaximize2 />
        </WindowActionButton>
      </WindowActions>
    </Container>
  )
}

export default Header
