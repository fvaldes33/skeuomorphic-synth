import React from 'react';
import { Layout, Keyboard, Button, Slot, Speaker, Piano } from '../components';

const Home = () => {
  const fullRow = (row: number) => {
    return Array.from(Array(17).keys()).map((index: number) => (
      <Slot key={index} placement={`${row} / ${index + 1} / span 1 / span 1`}>
        <Button />
      </Slot>
    ));
  }

  // const ninePad = () => {
  //   return Array.from(Array(3).keys()).map((index: number) => (
  //     <>
  //       <Slot placement={`4 / ${(index + 1)} / span 1 / span 1`}>
  //         <Button />
  //       </Slot>
  //       <Slot placement={`5 / ${(index + 1)} / span 1 / span 1`}>
  //         <Button />
  //       </Slot>
  //       <Slot placement={`6 / ${(index + 1)} / span 1 / span 1`}>
  //         <Button />
  //       </Slot>
  //     </>
  //   ));
  // }

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

          {fullRow(3)}

          <Piano />

        </Keyboard>
      </Layout>
    </>
  );
}

export default Home;
