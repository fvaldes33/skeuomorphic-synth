import React from 'react';
import styled from '../../styled';
import { keyboardMap } from '../../utils/piano-keys';
import { Slot } from '../Slot';
import { Grid } from '../Grid';
import { PianoKey } from '../PianoKey';

const PianoStyles = styled.div`
  grid-area: 4 / 4 / 18 / 18;
  display: grid;
  grid-template-columns: repeat(14, 1fr);
  grid-template-rows: 1fr 2fr;
`;

const PianoBlackKeys = styled.div`
  grid-area: 1 / 1 / span 1 / span 14;
  display: grid;
  grid-template-columns: repeat(14, 1fr);
  grid-template-rows: 1fr;
`;

const PianoWhiteKeys = styled.div`
  grid-area: 2 / 1 / span 2 / span 14;
  display: grid;
  grid-template-columns: repeat(14, 1fr);
  grid-template-rows: repeat(1, 1fr);
`;

const Piano: React.FC<{ octave?: number }> = ({ octave = 4 }) => {

  const whiteKeys = () => {
    // const visibleKeys = [...whiteKeyNames.slice(3), ...whiteKeyNames, ...whiteKeyNames.slice(0, 3)];
    const visibleWhiteKeys = keyboardMap.map((item, index) => ({ ...item, i: index })).filter((item: { code: string, key: string }) => !item.key.includes('#'));

    return visibleWhiteKeys.map((visibleWhiteKey: { code: string, key: string, i: number }, index: number) => (
      <Slot key={index} placement={`1 / ${index + 1} / span 2 / span 1`}>
        <PianoKey keyCode={visibleWhiteKey.code} octave={index < 4 ? octave - 1 : index > 10 ? octave + 1 : octave} note={visibleWhiteKey.key}/>
      </Slot>
    ));
  }

  return (
    <PianoStyles>
      <PianoBlackKeys>

        <Slot placement="1 / 1 / span 1 / span 4">
          <Grid columns={8}>
            <Slot placement="1 / 1 / span 1 / span 3">
              <PianoKey keyCode="Digit1" pl={60} octave={octave - 1} color="dark" note="F#" />
            </Slot>
            <Slot placement="1 / 4 / span 1 / span 2">
              <PianoKey keyCode="Digit2" color="dark" octave={octave - 1} note="G#" />
            </Slot>
            <Slot placement="1 / 6 / span 1 / span 3">
              <PianoKey keyCode="Digit3" pr={60} color="dark" octave={octave - 1} note="A#" />
            </Slot>
          </Grid>
        </Slot>

        <Slot placement="1 / 5 / span 1 / span 3">
          <Grid columns={6}>
            <Slot placement="1 / 1 / span 1 / span 3">
              <PianoKey keyCode="Digit5" pl={60} color="dark" octave={octave} note="C#" />
            </Slot>
            <Slot placement="1 / 4 / span 1 / span 3">
              <PianoKey keyCode="Digit6" pr={60} color="dark" octave={octave} note="D#" />
            </Slot>
          </Grid>
        </Slot>

        <Slot placement="1 / 8 / span 1 / span 4">
          <Grid columns={8}>
            <Slot placement="1 / 1 / span 1 / span 3">
              <PianoKey keyCode="Digit7" pl={60} color="dark" octave={octave} note="F#" />
            </Slot>
            <Slot placement="1 / 4 / span 1 / span 2">
              <PianoKey keyCode="Digit8" color="dark" octave={octave} note="G#" />
            </Slot>
            <Slot placement="1 / 6 / span 1 / span 3">
              <PianoKey keyCode="Digit9" pr={60} color="dark" octave={octave} note="A#" />
            </Slot>
          </Grid>
        </Slot>

        <Slot placement="1 / 12 / span 1 / span 3">
          <Grid columns={6}>
            <Slot placement="1 / 1 / span 1 / span 3">
              <PianoKey keyCode="Minus" pl={60} color="dark" octave={octave + 1} note="C#" />
            </Slot>
            <Slot placement="1 / 4 / span 1 / span 3">
              <PianoKey keyCode="Equal" pr={60} color="dark" octave={octave + 1} note="D#" />
            </Slot>
          </Grid>
        </Slot>
      </PianoBlackKeys>

      <PianoWhiteKeys>
        {whiteKeys()}
      </PianoWhiteKeys>
    </PianoStyles>
  );
}

export { Piano };
