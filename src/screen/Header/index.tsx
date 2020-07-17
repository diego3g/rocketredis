import React, { useCallback, useMemo, memo } from 'react'
import { FiX, FiMinus, FiMaximize2, FiSquare } from 'react-icons/fi'

import { remote } from 'electron'
import os from 'os'

import { useConfig } from '../../hooks/useConfig'
import {
  Container,
  WindowActions,
  MacActionButton,
  DefaultActionButton
} from './styles'

const Header: React.FC = () => {
  const handleCloseWindow = useCallback(() => {
    const window = remote.getCurrentWindow()

    window.close()
  }, [])

  const handleMaximize = useCallback(() => {
    const window = remote.getCurrentWindow()

    const isMacSystem = os.platform() === 'darwin'
    if (isMacSystem) {
      return window.setFullScreen(!window.isFullScreen())
    }

    const { width: currentWidth, height: currentHeight } = window.getBounds()

    const {
      width: maxWidth,
      height: maxHeight
    } = remote.screen.getPrimaryDisplay().workAreaSize

    const isMaximized = currentWidth === maxWidth && currentHeight === maxHeight

    if (!isMaximized) {
      window.maximize()
    } else {
      window.unmaximize()
    }
  }, [])

  const handleMinimize = useCallback(() => {
    const window = remote.getCurrentWindow()

    window.minimize()
  }, [])

  const useMacOSWindowActionButtons = useConfig('useMacOSWindowActionButtons')

  const shouldUseMacOSWindowActions = useMemo(() => {
    return useMacOSWindowActionButtons || os.platform() === 'darwin'
  }, [useMacOSWindowActionButtons])

  return (
    <Container>
      <strong>Rocket Redis</strong>

      {shouldUseMacOSWindowActions ? (
        <WindowActions position="left" shouldShowIconsOnHover>
          <MacActionButton color="close" onClick={handleCloseWindow}>
            <FiX />
          </MacActionButton>
          <MacActionButton color="minimize" onClick={handleMinimize}>
            <FiMinus />
          </MacActionButton>
          <MacActionButton color="maximize" onClick={handleMaximize}>
            <FiMaximize2 />
          </MacActionButton>
        </WindowActions>
      ) : (
        <WindowActions position="right">
          <DefaultActionButton onClick={handleMinimize}>
            <FiMinus />
          </DefaultActionButton>
          <DefaultActionButton onClick={handleMaximize}>
            <FiSquare />
          </DefaultActionButton>
          <DefaultActionButton onClick={handleCloseWindow}>
            <FiX />
          </DefaultActionButton>
        </WindowActions>
      )}
    </Container>
  )
}

export default memo(Header)
