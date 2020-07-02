import { store } from '../store'
import { Rectangle } from 'electron'

export const getWindowBounds = function (): Rectangle {
  const {
    width,
    height,
    x,
    y
  } = store.get('windowBounds') as Rectangle

  return {
    width: width || 1100,
    height: height || 700,
    x,
    y
  }
}

export const setWindowBounds = function (bounds: Rectangle | undefined): void{
  if (!bounds) {
    return
  }
  const {
    width,
    height,
    x,
    y
  } = bounds

  store.set('windowBounds', {
    width: width || 1100,
    height: height || 700,
    x,
    y
  })
}
