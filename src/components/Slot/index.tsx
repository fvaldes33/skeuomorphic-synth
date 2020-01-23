import React from 'react';
import { Box } from '../Box';
import styled, { IThemeStyledFunction } from '../../styled';

type SlotProps = IThemeStyledFunction & {
  placement: string;
}

const SlotStyles = styled(Box)<SlotProps>`
  grid-area: ${props => props.placement};
`;

const Slot: React.FC<SlotProps> = ({ placement, children }) => {
  return (
    <SlotStyles placement={placement}>
      {children}
    </SlotStyles>
  );
}

export { Slot };
