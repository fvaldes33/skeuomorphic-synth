import React, { useState, forwardRef } from 'react';
import styled, { IThemeStyledFunction } from '../../styled';
import { space, SpaceProps, BackgroundProps, background } from 'styled-system';

type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
type ButtonStyleProps = IThemeStyledFunction & ButtonProps & SpaceProps & BackgroundProps & {
  bg?: string;
  down?: boolean;
};

const ButtonInner = styled.div`
  box-sizing: border-box;
  border-radius: 40px;
  height: 100%;
  width: 100%;
  transition: all 0.2s ease;
`;

const ButtonStyles = styled.button<ButtonStyleProps>`
  appearance: none;
  border: none;
  background: #D9DCE5;
  border: 3px solid #000000;
  border-radius: 6px;
  outline: none;
  height: 100%;
  width: 100%;
  padding: 15px;

  ${ButtonInner} {
    ${props => props.background === 'black' ? `
      border: 1px solid #D9DCE5;
      box-shadow: ${!props.down ? `5px 5px 10px #A6ABBD, -5px -5px 10px #F4F4F4` : `inset 2px 5px 5px #A6ABBD`};
    ` : `
      background: #DCDFE7;
      box-shadow: ${!props.down ? `5px 5px 10px #A6ABBD, -5px -5px 10px #F4F4F4, inset 0px 1px 8px rgba(0, 0, 0, 0.05), inset 4px 4px 4px rgba(238, 238, 238, 0.5)` : `inset 5px 5px 10px #A6ABBD`};
    `}

    ${background}
  }

  ${space}
`;

const ButtonComponent: React.FC<ButtonStyleProps> = ({ ref, onClick, children, bg, ...rest }) => {
  const [mouseDown, setMouseDown] = useState<boolean>(false);

  return (
    <ButtonStyles background={bg} down={mouseDown} onMouseDown={() => setMouseDown(true)} onMouseUp={() => setMouseDown(false)} onClick={onClick} {...rest}>
      <ButtonInner>
        {children}
      </ButtonInner>
    </ButtonStyles>
  );
}

type Ref = HTMLButtonElement;

export const Button = forwardRef<Ref, ButtonStyleProps>((props, ref) => (
  <ButtonComponent ref={ref} {...props} />
));
