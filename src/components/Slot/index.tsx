import React from 'react';
import { Box } from '../Box';
import styled, { IThemeStyledFunction } from '../../styled';
import { SpaceProps, space } from 'styled-system';

type SlotProps = IThemeStyledFunction & SpaceProps & {
  placement: string;
}

const SlotStyles = styled(Box)<SlotProps>`
  grid-area: ${props => props.placement};

  ${space}
`;

const Slot: React.FC<SlotProps> = ({ placement, children, ...rest }) => {
  return (
    <SlotStyles placement={placement} {...rest}>
      {children}
    </SlotStyles>
  );
}

export { Slot };
