import React from 'react';
import { ThemeProvider } from './styled';
import { theme } from './theme';
import { BaseStyles } from './components';
import Home from './pages/home';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <BaseStyles />
      <Home />
    </ThemeProvider>
  );
}

export default App;
