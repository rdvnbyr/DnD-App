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

type TypographyEnum = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
type TypographyStyle = {
  'font-size': string;
  'font-weight': number;
  'line-height': number;
  'margin-bottom': string;
};

declare module 'styled-components' {
  export interface DefaultTheme {
    base: {
      textColor: string;
      fontFamily: string;
      fontSize: string;
      fontWeight: number;
      lineHeight: number;
      radius: string;
    };
    grayscale: {
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    colors: {
      [key in ColorEnum]: {
        main: string;
        light: string;
        dark: string;
        textColor: Style;
      };
    };
    typography: {
      fontFamily: string;
      fontSize: string;
      fontWeight: number;
      lineHeight: number;
      // [key in TypographyEnum]: {
      //   'font-size': string;
      //   'font-weight': number;
      //   'line-height': number;
      //   'margin-bottom': string;
      // };
    };
    spacing: {
      [key: string]: string;
    };
    breakpoints: {};
    zIndex: {};
    shapes: {
      rounded: string;
      roundedCircle: string;
      roundedPill: string;
      roundedNone: string;
    };
    shadows: {
      boxShadow: string;
      boxShadowHover: string;
      boxShadowActive: string;
    };
    transitions: {};
  }
}
