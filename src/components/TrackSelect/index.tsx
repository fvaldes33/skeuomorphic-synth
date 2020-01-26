import React from 'react';
// import Machine from '../../engine/MachineSubject';
import { Box } from '../Box';
import styled from '../../styled';
import { Slot } from '../Slot';
import { Button } from '../Button';

const TrackSelectStyles = styled(Box)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(1, 1fr);
  height: 100%;
`;

const TrackSelectType = styled.h1`
  font-family: 'VT323', monospace;
  font-size: 38px;
  margin: 0;
`;

const TrackSelect: React.FC<any> = () => {
  return (
    <TrackSelectStyles>
      <Slot placement="1 / 1 / span 1 / span 1">
        <Button color="dark">
          <TrackSelectType>1</TrackSelectType>
        </Button>
      </Slot>
      <Slot placement="1 / 2 / span 1 / span 1">
        <Button color="dark">
          <TrackSelectType>2</TrackSelectType>
        </Button>
      </Slot>
      <Slot placement="1 / 3 / span 1 / span 1">
        <Button color="dark">
          <TrackSelectType>3</TrackSelectType>
        </Button>
      </Slot>
      <Slot placement="1 / 4 / span 1 / span 1">
        <Button color="dark">
          <TrackSelectType>4</TrackSelectType>
        </Button>
      </Slot>
    </TrackSelectStyles>
  );
}

export { TrackSelect };
