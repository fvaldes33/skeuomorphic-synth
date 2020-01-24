import React, { useEffect, useState, useRef } from 'react';
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
`;

const Display: React.FC<any> = () => {

  const cv = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<MachineState>();

  useEffect(
    () => {
      // let raf: any;

      // const draw = () => {
      //   const values: any = Machine.waveform.getValue();
      //   if (cv && cv.current) {
      //     const ctx = cv.current.getContext("2d");

      //     if (ctx) {
      //       ctx.clearRect(0, 0, 345, 100);
      //       ctx.beginPath();
      //       ctx.lineJoin = "round";
      //       ctx.lineWidth = 3;
      //       ctx.strokeStyle = "#333";
      //       ctx.moveTo(0, (values[0] / 255));
      //       for (var i = 1, len = values.length; i < len; i++) {
      //         var val = values[i] / 255;
      //         var x = 345 * (i / len);
      //         var y = val * 100;
      //         ctx.lineTo(x, y + 50);
      //       }
      //       ctx.stroke();
      //     }
      //   }

      //   raf = requestAnimationFrame(draw);
      // };

      const sub = Machine.state$.subscribe((next: MachineState) => {
        setState(next);

        // if (!next.note) {
        //   cancelAnimationFrame(raf);
        // } else {
        //   draw()
        // }
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
        <Box height="100%" color="dark" bg="white">
          <canvas width="345" height="100" ref={cv}></canvas>
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
