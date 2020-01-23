import { useState, useEffect } from "react";

export function useKeyPress(targetKey: string) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);

  // If pressed key is our target key then set to true
  function downHandler({ code }: { code: string }) {
    if (code === targetKey) {
      setKeyPressed(true);
    }
  }

  // If released key is our target key then set to false
  const upHandler = ({ code }: { code: string }) => {
    if (code === targetKey) {
      setKeyPressed(false);
    }
  };

  // Add event listeners
  useEffect(
    () => {
      window.addEventListener('keydown', downHandler);
      window.addEventListener('keyup', upHandler);
      // Remove event listeners on cleanupt
      return () => {
        window.removeEventListener('keydown', downHandler);
        window.removeEventListener('keyup', upHandler);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return keyPressed;
}
