// import { Theme } from 'styled-system';
import { colors } from './colors';
import { breakpoints } from './breakpoints';

export type IDefaultTheme = typeof theme;

export const theme = {
  breakpoints,
  colors: {
    ...colors,
  },
  siteMaxWidth: '1440px',
  space: [0, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 72, 80, 96, 112, 128, 144],
};
