import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
import styled, { IThemeStyledFunction } from '../../styled';
import { SpaceProps, space } from 'styled-system';
import { playNote } from '../../engine';
import { useKeyPress } from '../../hooks';

type PianoKeyStyleProps = IThemeStyledFunction & SpaceProps & {
  bg?: string;
  down?: boolean;
}

type PianoKeyProps = PianoKeyStyleProps & {
  note: string;
  octave: number;
  color?: string;
  keyCode: string;
}

const PianoKeyStyles = styled(Button)<PianoKeyStyleProps>`
  ${space}
`;

const PianoKey: React.FC<PianoKeyProps> = ({ octave, note, color, keyCode, ...rest }) => {
  const [mouseDown, setMouseDown] = useState<boolean>(false);
  const keyPress = useKeyPress(keyCode);

  useEffect(
    () => {
      setMouseDown(keyPress);
    },
    [keyCode, keyPress]
  )

  useEffect(
    () => {
      if (mouseDown) {
        playNote(note, octave)
      }
    },
    [mouseDown, note, octave]
  )

  return (
    <PianoKeyStyles
      bg={color}
      down={mouseDown}
      onMouseDown={() => setMouseDown(true)}
      onMouseUp={() => setMouseDown(false)}
      onClick={() => { playNote(note, octave) }}
      {...rest} />
  );
}

export { PianoKey };
