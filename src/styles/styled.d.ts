import 'styled-components'
import { defaultTheme } from './theme'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof defaultTheme.colors
    backgrounds: typeof defaultTheme.backgrounds
  }
}
