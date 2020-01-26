import React, { useState, useEffect } from 'react';
import { Box } from '../Box';
import styled, { IThemeStyledFunction } from '../../styled';
import { SpaceProps, ColorProps, color, space } from 'styled-system';
import { darken } from 'polished';
import { get } from 'lodash';

type KnobProps = IThemeStyledFunction & SpaceProps & ColorProps & {
  size?: number;
  min?: number;
  max?: number;
  numTicks?: number;
  degrees?: number;
  value?: number;
  onChange: (e: any) => void;
}

const KnobInner = styled.div`
  align-items: center;
  border-radius: 50%;
  border: 5px solid #74788D;
  display: flex;
  height: 108px;
  justify-content: center;
  width: 108px;
`;

const KnobCenter: any = styled.div`
  align-items: center;
  box-shadow:
    6px 6px 5px #A6ABBD,
    inset 0px 1px 8px rgba(0, 0, 0, 0.05),
    inset 2px 2px 2px rgba(238, 238, 238, 0.5);
  border-radius: 50%;
  display: flex;
  height: 62px;
  justify-content: center;
  width: 62px;
`;

const KnobIndent: any = styled.div.attrs((props: { deg?: number }) => ({
  style: {
    transform: `rotate(${props.deg}deg)`,
  },
}))`
  border: 0.5px solid;
  box-sizing: border-box;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25), inset 1px 1px 0.5px rgba(0, 0, 0, 0.1);
  border-radius: 50px;
  height: 36px;
  width: 10px;
`;

const KnobStyles = styled(Box)<KnobProps>`
  align-items: center;
  background: #D9DCE5;
  border: 3px solid #000000;
  border-radius: 6px;
  display: flex;
  height: 100%;
  justify-content: center;
  outline: none;
  width: 100%;
  padding: 15px;

  ${KnobCenter} {
    ${color}
  }

  ${KnobIndent} {
    border-color: ${props => darken(0.1, get(props.theme.colors, props.bg))};
  }

  ${space}
`;

const Knob: React.FC<KnobProps> = ({
  size = 150,
  min = 0,
  max = 360,
  numTicks = 0,
  degrees = 360,
  value = 0,
  onChange,
  ...rest
}) => {

  const [currentDeg, setCurrentDeg] = useState<number>(0);
  const startAngle = (360 - degrees) / 2;
  const endAngle = startAngle + degrees;

  useEffect(
    () => {
      const startVal = Math.floor(
        convertRange(
          min,
          max,
          startAngle,
          endAngle,
          value
        )
      );
      setCurrentDeg(startVal);
    },
    [min, max, endAngle, startAngle, value, setCurrentDeg]
  )

  const getDeg = (cX: number, cY: number, pts: { x: number; y: number }) => {
    const x = cX - pts.x;
    const y = cY - pts.y;
    let deg = Math.atan(y / x) * 180 / Math.PI;
    if ((x < 0 && y >= 0) || (x < 0 && y < 0)) {
      deg += 90;
    } else {
      deg += 270;
    }
    let finalDeg = Math.min(Math.max(startAngle, deg), endAngle);
    return finalDeg;
  };

  const convertRange = (oldMin: number, oldMax: number, newMin: number, newMax: number, oldValue: number) => {
    return (oldValue - oldMin) * (newMax - newMin) / (oldMax - oldMin) + newMin;
  };

  const startDrag = (e: any) => {
    e.preventDefault();
    const knob = e.target.getBoundingClientRect();
    const pts = {
      x: knob.left + knob.width / 2,
      y: knob.top + knob.height / 2
    };
    const moveHandler = (e: any) => {
      let currentDeg = getDeg(e.clientX, e.clientY, pts);
      if (currentDeg === startAngle) currentDeg--;
      let newValue = Math.floor(
        convertRange(
          startAngle,
          endAngle,
          min,
          max,
          currentDeg
        )
      );
      setCurrentDeg(currentDeg);
      onChange(newValue);
    };
    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", e => {
      document.removeEventListener("mousemove", moveHandler);
    });
  };

  return (
    <KnobStyles {...rest}>
      <KnobInner>
        <KnobCenter onMouseDown={(e: any) => startDrag(e)}>
          <KnobIndent deg={currentDeg}/>
        </KnobCenter>
      </KnobInner>
    </KnobStyles>
  );
}

export { Knob };
