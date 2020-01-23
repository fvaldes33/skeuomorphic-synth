export const breakpoints: string[] = ['400px', '768px', '1024px', '1280px', '1440px'];

export const media = {
  sm: `@media screen and (min-width: ${breakpoints[0]})`,
  md: `@media screen and (min-width: ${breakpoints[1]})`,
  lg: `@media screen and (min-width: ${breakpoints[2]})`,
  xl: `@media screen and (min-width: ${breakpoints[3]})`,
  xxl: `@media screen and (min-width: ${breakpoints[4]})`,
}
