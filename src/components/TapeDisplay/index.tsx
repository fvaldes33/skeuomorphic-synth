import React, { useEffect, useState, useRef } from 'react';
import { CanvasSpace } from 'pts';
import { Box } from '../Box';
import styled from '../../styled';
import Machine from '../../engine/MachineSubject';
import { MachineState } from '../../interfaces';

const DisplayStyles = styled(Box)`
  background: ${props => props.theme.colors.dark};
  height: 100%;
  width: 100%;
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

const TapeDisplay: React.FC<any> = () => {

  const cv = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<MachineState>();

  useEffect(
    () => {
      const sub = Machine.state$.subscribe((next: MachineState) => {
        setState(next);
      });

      return () => sub.unsubscribe();
    },
    []
  );

  useEffect(
    () => {
      let space: CanvasSpace;

      if (cv.current) {
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

      return () => {
        if (space) {
          space.stop();
        }
      }
    },
    []
  )

  return (
    <DisplayStyles>
      <Box height="100%" bg="dark" ref={cv}></Box>
    </DisplayStyles>
  );
}

export { TapeDisplay };
