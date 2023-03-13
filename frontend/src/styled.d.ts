// import original module declarations
import 'styled-components';

type ColorEnum =
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'light'
  | 'dark';
// and extend them!

declare module 'styled-components' {
  export interface DefaultTheme {
    base: {};

    colors: {
      [key in ColorEnum]: {
        main: string;
        light: string;
        dark: string;
        gradient: Style;
      };
    };
    typography: {
      fontFamily: string;
      fontSize: string;
      fontWeight: number;
      lineHeight: number;
    };
    spacing: {};
    breakpoints: {};
    zIndex: {};
    shapes: {};
    shadows: {};
    transitions: {};
  }
}
