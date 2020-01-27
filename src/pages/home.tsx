import React, { useEffect, useState } from 'react';
import { Layout, Keyboard, Button, Slot, Speaker, Piano, Display, Playback, ModeSelect, Knob, TrackSelect, InstrumentSelect } from '../components';
import Machine from '../engine/MachineSubject';
import { MachineState } from '../interfaces';

const Home = () => {
  // const fullRow = (row: number) => {
  //   return Array.from(Array(17).keys()).map((index: number) => (
  //     <Slot key={index} placement={`${row} / ${index + 1} / span 1 / span 1`}>
  //       <Button />
  //     </Slot>
  //   ));
  // }

  const [octave, setOctave] = useState<number>(4);

  useEffect(
    () => {
      Machine.state$.subscribe((state: MachineState) => {
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

          {/* Knob Components */}
          <Slot placement="1 / 9 / span 2 / span 2">
            <Knob bg="primary" value={45} onChange={(e) => Machine.setKnobValue(1, e)} />
          </Slot>
          <Slot placement="1 / 11 / span 2 / span 2">
            <Knob bg="secondary" value={135} onChange={(e) => Machine.setKnobValue(2, e)} />
          </Slot>
          <Slot placement="1 / 13 / span 2 / span 2">
            <Knob bg="white" value={90} onChange={(e) => Machine.setKnobValue(3, e)} />
          </Slot>
          <Slot placement="1 / 15 / span 2 / span 2">
            <Knob bg="tertiary" value={45} onChange={(e) => Machine.setKnobValue(4, e)} />
          </Slot>

          {/* Mode Select Components */}
          <Slot placement="3 / 1 / span 1 / span 4">
            <ModeSelect />
          </Slot>

          {/* Track Select Components */}
          <Slot placement="3 / 5 / span 1 / span 4">
            <TrackSelect />
          </Slot>

          {/* Instrument Select Components */}
          <Slot placement="3 / 9 / span 1 / span 8">
            <InstrumentSelect/>
          </Slot>

          {/* Record Play Pause Transpose Metronome Components */}
          <Slot placement="4 / 1 / span 3 / span 3">
            <Playback octave={octave} />
          </Slot>

          {/* Piano Keys Components */}
          <Piano octave={octave} />

        </Keyboard>

      </Layout>
    </>
  );
}

export default Home;
