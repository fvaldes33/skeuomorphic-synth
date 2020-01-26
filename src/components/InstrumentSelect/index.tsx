import React from 'react';
import Machine from '../../engine/MachineSubject';
import { Box } from '../Box';
import styled from '../../styled';
import { Slot } from '../Slot';
import { Button } from '../Button';

const InstrumentSelectStyles = styled(Box)`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(1, 1fr);
  height: 100%;
`;

const InstrumentSelectType = styled.h1`
  font-family: 'VT323', monospace;
  font-size: 38px;
  margin: 0;
`;

const InstrumentSelect: React.FC<any> = () => {
  return (
    <InstrumentSelectStyles>
      <Slot placement="1 / 1 / span 1 / span 1">
        <Button color="dark" onClick={() => Machine.setSynth(0)}>
          <InstrumentSelectType>1</InstrumentSelectType>
        </Button>
      </Slot>
      <Slot placement="1 / 2 / span 1 / span 1">
        <Button color="dark" onClick={() => Machine.setSynth(1)}>
          <InstrumentSelectType>2</InstrumentSelectType>
        </Button>
      </Slot>
      <Slot placement="1 / 3 / span 1 / span 1">
        <Button color="dark" onClick={() => Machine.setSynth(2)}>
          <InstrumentSelectType>3</InstrumentSelectType>
        </Button>
      </Slot>
      <Slot placement="1 / 4 / span 1 / span 1">
        <Button color="dark" onClick={() => Machine.setSynth(3)}>
          <InstrumentSelectType>4</InstrumentSelectType>
        </Button>
      </Slot>
      <Slot placement="1 / 5 / span 1 / span 1">
        <Button color="dark" onClick={() => Machine.setSynth(4)}>
          <InstrumentSelectType>5</InstrumentSelectType>
        </Button>
      </Slot>
      <Slot placement="1 / 6 / span 1 / span 1">
        <Button color="dark" onClick={() => Machine.setSynth(5)}>
          <InstrumentSelectType>6</InstrumentSelectType>
        </Button>
      </Slot>
      <Slot placement="1 / 7 / span 1 / span 1">
        <Button color="dark" onClick={() => Machine.setSynth(6)}>
          <InstrumentSelectType>7</InstrumentSelectType>
        </Button>
      </Slot>
      <Slot placement="1 / 8 / span 1 / span 1">
        <Button color="dark" onClick={() => Machine.setSynth(7)}>
          <InstrumentSelectType>8</InstrumentSelectType>
        </Button>
      </Slot>
    </InstrumentSelectStyles>
  );
}

export { InstrumentSelect };
