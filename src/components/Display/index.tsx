import React, { useEffect, useState, useRef } from 'react';
import { CanvasSpace } from 'pts';
import { Box } from '../Box';
import styled from '../../styled';
import Machine from '../../engine/MachineSubject';
import { MachineState } from '../../interfaces';
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
  }

  canvas {
    height: 100%;
    width: 100%;
  }
`;

const Display: React.FC<any> = () => {

  const cv = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<MachineState>();

  useEffect(
    () => {
      let space: CanvasSpace;

      if (cv.current) {
        space = new CanvasSpace(cv.current);
        const form = space.getForm();
        space.add({
          animate: () => {
            if (Machine.synth.context.state === "suspended") {
              space.pause();
            }

            let area = space.size.$divide(1);
            let idx = space.pointer.$divide(area).floor();
            let rect = [idx.$multiply(area), idx.$multiply(area).add(area)];
            // let t1 = Machine.sound.timeDomainTo(area, rect[0].$subtract(0, area.y / 2));
            // let t2 = t1.map(t => t.$add(0, area.y)).reverse();
            let freqs: any = Machine.sound.freqDomainTo([area.x, area.y / 2], [rect[0].x, 0]).map(f => [[f.x, rect[0].y + area.y / 2 - f.y], [f.x, rect[0].y + area.y / 2 + f.y]]);

            form.stroke('#2E3337');
            form.fill("#2E3337").rect(rect);
            form.strokeOnly("#5CB6F2", Math.ceil(area.x / 1024)).lines(freqs);
          }
        })
        space.play();
      }

      const sub = Machine.state$.subscribe((next: MachineState) => {
        setState(next);
      });

      return () => sub.unsubscribe();
    },
    []
  );

  return (
    <DisplayStyles>
      <Slot placement="1 / 1 / span 1 / span 1">
        <h3>BPM: {state && state.bpm}</h3>
      </Slot>

      <Slot placement="2 / 1 / span 4 / span 4">
        <Box height="100%" bg="dark" ref={cv}>
        </Box>
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
