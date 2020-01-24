import React, { useEffect, useState } from 'react';
import { Layout, Keyboard, Button, Slot, Speaker, Piano, Display, Playback } from '../components';
import Machine from '../engine/MachineSubject';
import { MachineState } from '../interfaces';

const Home = () => {
  const fullRow = (row: number) => {
    return Array.from(Array(17).keys()).map((index: number) => (
      <Slot key={index} placement={`${row} / ${index + 1} / span 1 / span 1`}>
        <Button />
      </Slot>
    ));
  }

  const [octave, setOctave] = useState<number>(4);
  useEffect(
    () => {
      Machine.state$.subscribe((state: MachineState) => {
        // console.log(state)
        setOctave(state.octave);
      });
    },
    []
  )

  return (
    <>
      <Layout>
        <Keyboard>
          <Slot placement="1 / 1 / span 2 / span 2">
            <Speaker />
          </Slot>

          <Slot placement="1 / 3 / span 1 / span 2">
            <Button />
          </Slot>
          <Slot placement="2 / 3 / span 1 / span 1">
            <Button />
          </Slot>
          <Slot placement="2 / 4 / span 1 / span 1">
            <Button />
          </Slot>

          <Slot placement="1 / 5 / span 2 / span 4">
            <Display />
          </Slot>

          <Slot placement="4 / 1 / span 3 / span 3">
            <Playback octave={octave}/>
          </Slot>

          {fullRow(3)}

          <Piano octave={octave} />

        </Keyboard>
      </Layout>
    </>
  );
}

export default Home;
