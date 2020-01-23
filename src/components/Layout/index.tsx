import React from 'react';
import { Box } from '../Box';
import styled from '../../styled';

const LayoutStyles = styled(Box)`
  align-items: center;
  background: radial-gradient(51.21% 161.85% at 50.51% 50.9%, #CBCCD2 0%, #A7AEB6 100%);
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

const Layout: React.FC<any> = ({ children }) => {
  return (
    <LayoutStyles>
      {children}
    </LayoutStyles>
  );
}

export { Layout };
