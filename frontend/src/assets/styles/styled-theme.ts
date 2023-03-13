import { lighten, darken, linearGradient, tint } from 'polished';
import { DefaultTheme } from 'styled-components';

const colors = {
  primary: {
    main: '#0080ff',
    light: '#d8ecff',
    dark: '#0062c4',
    textColor: '#fff',
  },
  secondary: {
    main: '#FF0080',
    light: '#FFDAEC',
    dark: '#B6005B',
    textColor: '#fff',
  },
  info: {
    main: '#FF7F00',
    light: '#fff5eb',
    dark: '#c46200',
    textColor: '#fff',
  },
  success: {
    main: '#00ff80',
    light: '#d8ffeb',
    dark: '#00c462',
    textColor: '#fff',
  },
  warning: {
    main: '#ffff00',
    light: '#ffffeb',
    dark: '#c4c400',
    textColor: '#565656',
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
    textColor: '#565656',
  },
  dark: {
    main: '#343a40',
    light: '#565656',
    dark: '#000',
    textColor: '#fff',
  },
};

export const styledTheme: DefaultTheme = {
  base: {},
  colors: colors,
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.5,
  },
  spacing: {},
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
