// import { lighten, darken, linearGradient, tint } from 'polished';
import { DefaultTheme } from 'styled-components';

const base = {
  textColor: '#565656',
  fontFamily: 'Roboto, sans-serif',
  fontSize: '1rem',
  fontWeight: 400,
  lineHeight: 1.5,
  radius: '0.25rem',
  white: '#fff',
  black: '#000',
};

const colors = {
  primary: {
    main: '#0080ff',
    light: '#d8ecff',
    dark: '#0062c4',
    textColor: base.white,
  },
  secondary: {
    main: '#FF7F00',
    light: '#fff5eb',
    dark: '#c46200',
    textColor: base.white,
  },
  info: {
    main: '#FF0080',
    light: '#FFDAEC',
    dark: '#B6005B',
    textColor: base.white,
  },
  success: {
    main: '#00ff7f',
    light: '#ebfff5',
    dark: '#00b158',
    textColor: base.textColor,
  },
  warning: {
    main: '#ffff00',
    light: '#ffffeb',
    dark: '#c4c400',
    textColor: base.textColor,
  },
  danger: {
    main: '#ff0000',
    light: '#ffebec',
    dark: '#c40000',
    textColor: '#fff',
  },
  light: {
    main: '#f8f9fa',
    light: '#fff',
    dark: '#d8d8d8',
    textColor: base.textColor,
  },
  dark: {
    main: '#343a40',
    light: base.textColor,
    dark: '#000',
    textColor: '#fff',
  },
};

export const styledTheme: DefaultTheme = {
  base: base,
  colors: colors,
  grayscale: {
    100: '#f8f9fa',
    200: '#e9ecef',
    300: '#dee2e6',
    400: '#ced4da',
    500: '#adb5bd',
    600: '#6c757d',
    700: '#495057',
    800: '#343a40',
    900: '#212529',
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.5,
  },
  spacing: {
    none: '0rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '1.75rem',
    xl2: '2rem',
    xl3: '3rem',
    xl4: '4rem',
    xl5: '5rem',
    xl6: '6rem',
  },
  breakpoints: {},
  zIndex: {},
  shapes: {
    rounded: '0.25rem',
    roundedCircle: '50%',
    roundedPill: '50rem',
    roundedNone: '0',
  },
  shadows: {
    boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
    boxShadowHover: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
    boxShadowActive: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
  },
  transitions: {},
};

export type TStyledTheme = typeof styledTheme;
