import styled from 'styled-components'
import { defaultTheme } from '../../styles/theme'
import { lighten } from 'polished'

export const Container = styled.header`
  width: 100%;
  height: 40px;
  position: relative;

  -webkit-user-select: none;
  -webkit-app-region: drag;

  display: flex;
  align-items: center;
  justify-content: center;

  border-bottom: 1px solid ${props => props.theme.colors.background.lightest};

  strong {
    font-size: 14px;
    font-weight: 300;
    color: ${props => props.theme.colors.white};
  }
`

export const WindowActions = styled.div`
  position: absolute;
  left: 16px;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
`

interface WindowActionButtonProps {
  color: 'close' | 'minimize' | 'maximize';
}

const colors = {
  close: defaultTheme.colors.red,
  minimize: defaultTheme.colors.yellow,
  maximize: defaultTheme.colors.green
}

export const WindowActionButton = styled.button<WindowActionButtonProps>`
  background: ${props => colors[props.color]};
  -webkit-app-region: no-drag;
  border: 0;
  width: 12px;
  height: 12px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  & + button {
    margin-left: 8px;
  }

  svg {
    width: 8px;
    height: 8px;
    opacity: 0.9;
    display: none;
  }

  &:hover svg {
    display: block;
  }

  &:active {
    opacity: 0.6;
  }

  &:focus {
    outline: 0;
  }
`
