import React from 'react';
import { Box } from '../Box';
import styled from '../../styled';

const KeyboardStyles = styled(Box)`
  background: #DCDFE7;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1), inset 0px 2px 4px #C3C8D6, inset 0px -3px 4px #C6C9CE, inset 0px 4px 2px #E8EBF1;
  border-radius: 25px;
  width: 1645px;
  height: 594px;
`;

const KeyboardContourStyle = styled(Box)`
  background: #000000;
  border: 3px solid #000000;
  box-sizing: border-box;
  border-radius: 10px;
  margin: 24px;
  margin-right: 100px;
  height: calc(100% - 48px);
  display: grid;
  grid-template-columns: repeat(17, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
`;

const Keyboard: React.FC<any> = ({ children }) => {
  return (
    <KeyboardStyles>
      <KeyboardContourStyle>
        {children}
      </KeyboardContourStyle>
    </KeyboardStyles>
  );
}

export { Keyboard };
