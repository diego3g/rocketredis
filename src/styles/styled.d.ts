import 'styled-componets'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      white: string;
      grey: string;
      opaque: string;
      purple: string;
      purpleDark: string;
      green: string;
      orange: string;
      pink: string;
      cyan: string;
      red: string;
      yellow: string;
      background: {
        lightest: string;
        lighter: string;
        dark: string;
        darker: string;
        darkest: string;
      }
    }
  }
}
