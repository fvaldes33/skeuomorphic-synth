import React, { useState, forwardRef } from 'react';
import styled, { IThemeStyledFunction } from '../../styled';
import { space, ColorProps, SpaceProps, BackgroundProps, color, get } from 'styled-system';

type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
type ButtonStyleProps = IThemeStyledFunction & ButtonProps & SpaceProps & ColorProps & BackgroundProps & {
  bg?: string;
  down?: boolean;
};

const ButtonInner = styled.div`
  box-sizing: border-box;
  border-radius: 40px;
  height: 100%;
  width: 100%;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    height: 32px;
    width: 32px;
  }
`;

const defaultShadowPressed = `rgba(166, 171, 189, 0) 5px 5px 10px, rgb(244, 244, 244) -5px -5px 10px, rgba(166, 171, 189, 1) 3px 5px 10px inset, rgb(238, 238, 238) 4px 4px 4px inset`;
const defaultShadowRegular = `5px 5px 10px #A6ABBD, -5px -5px 10px #F4F4F4, inset 0px 1px 8px rgba(0, 0, 0, 0.05), inset 4px 4px 4px rgba(238, 238, 238, 0.5)`;

const darkShadowPressed = `rgba(166, 171, 189, 0) 5px 5px 10px, rgb(244, 244, 244) -5px -5px 10px, rgba(0, 0, 0, 1) 3px 5px 10px inset, rgb(0, 0, 0) 4px 4px 4px inset`;
const darkShadowRegular = `5px 5px 10px #A6ABBD, -5px -5px 10px #F4F4F4, inset 0px 1px 8px rgba(166, 171, 189, 0.05), inset 4px 4px 4px rgba(166, 171, 189, 0.5)`;

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
    ${props => props.bg === 'dark' ? `
      border: 2px solid #D9DCE5;
      box-shadow: ${props.down ? darkShadowPressed : darkShadowRegular};
    ` : `
      background: #DCDFE7;
      box-shadow: ${props.down ? defaultShadowPressed : defaultShadowRegular};
    `}

    svg {
      fill: ${props => get(props.theme.colors, props.color || 'dark')};
    }

    ${color}
  }

  ${space}
`;

const ButtonComponent: React.FC<ButtonStyleProps> = ({ ref, onClick, children, bg, ...rest }) => {
  const [mouseDown, setMouseDown] = useState<boolean>(false);

  return (
    <ButtonStyles bg={bg} down={mouseDown} onMouseDown={() => setMouseDown(true)} onMouseUp={() => setMouseDown(false)} onClick={onClick} {...rest}>
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
