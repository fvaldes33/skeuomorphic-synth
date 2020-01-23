import * as styledComponents from 'styled-components';
import { ThemedStyledFunction } from 'styled-components';
import { IDefaultTheme } from '../theme';
// import { colors } from '../theme/colors';

const {
  default: styled,
  css,
  withTheme,
  createGlobalStyle,
  ThemeProvider
} = styledComponents as unknown as styledComponents.ThemedStyledComponentsModule<IDefaultTheme>;
const { ServerStyleSheet } = styledComponents;

export type IThemeStyledFunction = Omit<ThemedStyledFunction<any, IDefaultTheme, {}>, 'attrs' | 'color'> & {
  color?: string;
};

export { css, ServerStyleSheet, createGlobalStyle, ThemeProvider, withTheme };
export default styled;
