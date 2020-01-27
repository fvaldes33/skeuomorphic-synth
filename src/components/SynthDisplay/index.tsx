import React, { useEffect, useState, useRef } from 'react';
import { Box } from '../Box';
import styled from '../../styled';
import { SynthState, SynthSubjectType } from '../../interfaces';

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

  p {
    line-height: 1;
    margin: 0;
    padding: 0;
  }

  canvas {
    height: 100%;
    width: 100%;
  }
`;

const SynthDisplay: React.FC<{ slot?: SynthSubjectType }> = ({ slot }) => {

  const cv = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<SynthState>();

  useEffect(
    () => {
      if (slot) {
        const sub = slot.subject.state$.subscribe((next: SynthState) => {
          setState(next);
        });

        return () => sub.unsubscribe();
      }
    },
    [slot]
  );

  return (
    <DisplayStyles>
      <Box height="100%" bg="dark" ref={cv}>
        {state && <p>Attack: {state.envelope.attack}</p>}
        {state && <p>Decay: {state.envelope.decay}</p>}
        {state && <p>Sustain: {state.envelope.sustain}</p>}
        {state && <p>Release: {state.envelope.release}</p>}
      </Box>
    </DisplayStyles>
  );
}

export { SynthDisplay };
