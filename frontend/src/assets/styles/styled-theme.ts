import { lighten, darken, linearGradient } from 'polished';
import { DefaultTheme } from 'styled-components';
const colors = {
  primary: "#0080ff" ,
  secondary: '#FF7F00',
  info: '#8000FF',
  success: '#009c46',
  warning: '#ffa600',
  danger: '#d90000',
  light: '#d8ebff',
  dark: '#001222',
  white: '#fff',
  black: '#000',
};
type Colors = typeof colors;

const getColor = (color: Partial<keyof Colors>) => {
  const _color = colors[color];
  return {
    main: _color,
    light: lighten(0.1, _color),
    dark: darken(0.1, _color),
    gradient: linearGradient({
      colorStops: [_color, darken(0.1, _color)],
      toDirection: 'to bottom',
      fallback: _color,
    }),
  };
};

export const styledTheme: DefaultTheme = {
  base: {},
  colors: {
    primary: getColor('primary'),
    secondary: getColor('secondary'),
    info: getColor('info'),
    success: getColor('success'),
    warning: getColor('warning'),
    danger: getColor('danger'),
    light: getColor('light'),
    dark: getColor('dark'),
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.5,
  },
  spacing: {},
  breakpoints: {},
  zIndex: {},
  shapes: {},
  shadows: {},
  transitions: {},
};

export type TStyledTheme = typeof styledTheme;
