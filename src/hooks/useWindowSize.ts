import { useState, useEffect } from 'react'

interface WindowSize {
  width: number;
  height: number;
}

interface UseWindowSizeOptions {
  watch?: boolean;
}

export function useWindowSize ({
  watch = true
}: UseWindowSizeOptions): WindowSize {
  function getSize () {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }

  const [windowSize, setWindowSize] = useState(getSize)

  useEffect(() => {
    function handleResize () {
      setWindowSize(getSize())
    }

    if (watch) {
      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  return windowSize
}
