import * as CSS from 'csstype';

export interface ThemeColors {
  white: CSS.ColorProperty;
  black: CSS.ColorProperty;
  primary: CSS.ColorProperty;
  secondary: CSS.ColorProperty;
  tertiary: CSS.ColorProperty;
  dark: CSS.ColorProperty;

  link: CSS.ColorProperty;
  success: CSS.ColorProperty;
  warning: CSS.ColorProperty;
  error: CSS.ColorProperty;
  heading: CSS.ColorProperty;
  text: CSS.ColorProperty;
  disabled: CSS.ColorProperty;
  border: CSS.ColorProperty;
}

export const colors: ThemeColors = {
  white: '#FFFFFF',
  black: '#000000',
  primary: '#8661C2',
  secondary: '#B3A1D4',
  tertiary: '#D4A1A1',
  dark: '#2E3337',
  link: '#1890ff',
  success: '#52c41a',
  warning: '#faad14',
  error: '#e84118',
  heading: '#262626',
  text: '#000',
  disabled: '#f5222d',
  border: '#423EA2',
};
