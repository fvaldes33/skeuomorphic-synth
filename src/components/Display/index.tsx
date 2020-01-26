import React, { useEffect, useState, useRef } from 'react';
import { CanvasSpace } from 'pts';
import { Box } from '../Box';
import styled from '../../styled';
import Machine from '../../engine/MachineSubject';
import { MachineState, MachineStateMode } from '../../interfaces';
import { Slot } from '../Slot';

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

  const cv = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<MachineState>();
  const [mode, setMode] = useState<MachineStateMode>(MachineStateMode.Synth);

  useEffect(
    () => {
      const sub = Machine.state$.subscribe((next: MachineState) => {
        setState(next);
        setMode(next.mode);
      });

      return () => sub.unsubscribe();
    },
    []
  );

  useEffect(
    () => {
      let space: CanvasSpace;

      if (mode === MachineStateMode.Tape && cv.current) {
        space = new CanvasSpace(cv.current);
        const form = space.getForm();
        space.add({
          animate: () => {
            if (Machine.synth && Machine.synth.context.state === "suspended") {
              space.pause();
            }

            if (Machine.sound) {
              let area = space.size.$divide(1);
              let idx = space.pointer.$divide(area).floor();
              let rect = [idx.$multiply(area), idx.$multiply(area).add(area)];
              let freqs: any = Machine.sound.freqDomainTo([area.x, area.y / 2], [rect[0].x, 0]).map(f => [[f.x, rect[0].y + area.y / 2 - f.y], [f.x, rect[0].y + area.y / 2 + f.y]]);

              form.stroke('#2E3337');
              form.fill("#2E3337").rect(rect);
              form.strokeOnly("#5CB6F2", Math.ceil(area.x / 1024)).lines(freqs);
            }
          }
        })
        space.play();
      }
    },
    [mode]
  )

  const synthVisual = () => {
    return (
      <Box height="100%" bg="dark" ref={cv}>
      </Box>
    );
  };

  const tapeVisual = () => {
    return (
      <Box height="100%" bg="dark" ref={cv}>
      </Box>
    );
  }

  const visual = () => {
    switch (state?.mode) {
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
