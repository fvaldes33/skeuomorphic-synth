import * as CSS from 'csstype';

export interface ThemeColors {
  white: CSS.ColorProperty;
  black: CSS.ColorProperty;
  primary: CSS.ColorProperty;
  secondary: CSS.ColorProperty;
  tertiary: CSS.ColorProperty;
  dark: CSS.ColorProperty;
  light: CSS.ColorProperty;

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
  primary: '#5CB6F2',
  secondary: '#02CA71',
  tertiary: '#F97133',
  dark: '#2E3337',
  link: '#1890ff',
  success: '#52c41a',
  warning: '#faad14',
  error: '#e84118',
  heading: '#262626',
  text: '#000',
  disabled: '#f5222d',
  border: '#423EA2',
  light: '#D9DCE5'
};
