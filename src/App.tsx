import React, { useState, SyntheticEvent } from 'react';
import { ThemeProvider } from './styled';
import { theme } from './theme';
import { BaseStyles } from './components/BaseStyles';
import { Box } from './components/Box';
import { Button } from './components/Button';
import 'ecma-proposal-math-extensions';

const App: React.FC = () => {
  const [isReady, setIsReady] = useState(false);

  const startUp = async (e: SyntheticEvent) => {
    const { start } = await import('tone');
    await start();
    setIsReady(true);
  }

  const renderHome = () => {
    const Home = require('./pages/home').default;
    return (
      <Home />
    )
  }

  const renderLoader = () => {
    return (
      <Box bg="light" display="flex" height="100vh" width="100vw" alignItems="center" justifyContent="center">
        <Box height="128px" width="128px">
          <Box textAlign="center">
            <h1>OP-1 Synth</h1>
            <h3>Click to start</h3>
          </Box>
          <Button border="none" color="primary" onClick={(e: any) => startUp(e)}>
            <svg version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="m50 95c-23.711 0-43-19.105-43-42.59 0-13.176 6.0117-25.395 16.488-33.535 1.2891-1 3.1523-0.77734 4.1641 0.5 1.0117 1.2773 0.78516 3.1211-0.50391 4.125-9.0352 7.0156-14.219 17.555-14.219 28.91 0 20.242 16.629 36.715 37.066 36.715 20.441 0 37.066-16.469 37.066-36.715 0-11.324-5.1562-21.844-14.152-28.859-1.2852-1.0039-1.5078-2.8516-0.49219-4.125 1.0156-1.2734 2.8789-1.4922 4.1641-0.48828 10.434 8.1367 16.418 20.336 16.418 33.473 0 23.484-19.289 42.59-43 42.59zm2.9648-48.684v-38.355c0-1.6367-1.3281-2.9609-2.9648-2.9609s-2.9648 1.3242-2.9648 2.9609v38.355c0 1.6367 1.3281 2.9609 2.9648 2.9609s2.9648-1.3281 2.9648-2.9609z" />
            </svg>
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <BaseStyles />
      {!isReady ? renderLoader() : renderHome()}
    </ThemeProvider>
  );
}

export default App;
