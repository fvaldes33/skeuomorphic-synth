import React from 'react';
import { Box } from '../Box';
import styled, { IThemeStyledFunction } from '../../styled';

type GridProps = IThemeStyledFunction & {
  rows?: number;
  columns?: number;
}

const GridStyles = styled(Box)<GridProps>`
  display: grid;
  grid-template-columns: ${props => `repeat(${props.columns}, 1fr)`};
  grid-template-rows: ${props => `repeat(${props.rows}, 1fr)`};
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  height: 100%;
`;

const Grid: React.FC<GridProps> = ({
  rows = 1,
  columns = 12,
  children
}) => {
  const props = { rows, columns };
  return (
    <GridStyles {...props}>
      {children}
    </GridStyles>
  );
}

export { Grid };
