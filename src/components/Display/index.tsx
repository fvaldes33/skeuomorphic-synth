import React, { useEffect, useState } from 'react';
import { Box } from '../Box';
import styled from '../../styled';
import Machine from '../../engine/MachineSubject';
import { MachineState, MachineStateMode, SynthSubjectType } from '../../interfaces';
import { Slot } from '../Slot';
import { TapeDisplay } from '../TapeDisplay';
import { SynthDisplay } from '../SynthDisplay';

const DisplayStyles = styled(Box)`
  background: ${props => props.theme.colors.dark};
  border-radius: 6px;
  border: 3px solid #000000;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(6, 1fr);
  height: 100%;
  padding: 8px;

  * {
    margin: 0;
    color: white;
    user-select: none;
  }

  canvas {
    height: 100%;
    width: 100%;
  }
`;

const Display: React.FC<any> = () => {

  const [state, setState] = useState<MachineState>();
  const [mode, setMode] = useState<MachineStateMode>(MachineStateMode.Synth);
  const [subject, setSubject] = useState<SynthSubjectType>();

  useEffect(
    () => {
      const sub = Machine.state$.subscribe((next: MachineState) => {
        setState(next);
        setMode(next.mode);
        setSubject(next.slots.find((slot: any) => slot.active))
      });

      return () => sub.unsubscribe();
    },
    []
  );

  const synthVisual = () => {
    return (
      <SynthDisplay slot={subject} />
    );
  };

  const tapeVisual = () => {
    return (
      <TapeDisplay />
    );
  }

  const visual = () => {
    switch (mode) {
      case MachineStateMode.Synth:
        return synthVisual();
      case MachineStateMode.Tape:
        return tapeVisual();
      default:
        break;
    }
  }

  return (
    <DisplayStyles>
      <Slot placement="1 / 1 / span 1 / span 1">
        <h3>Mode: {state && state.mode.toUpperCase()}</h3>
      </Slot>

      <Slot placement="1 / 4 / span 1 / span 1">
        <h3>BPM: {state && state.bpm}</h3>
      </Slot>

      <Slot placement="2 / 1 / span 4 / span 4">
        {visual()}
      </Slot>

      <Slot placement="6 / 1 / span 1 / span 1">
        <h3>{state && state.note}</h3>
      </Slot>
      <Slot placement="6 / 4 / span 1 / span 1">
        <h3>Octave: {state && state.octave}</h3>
      </Slot>
    </DisplayStyles>
  );
}

export { Display };
