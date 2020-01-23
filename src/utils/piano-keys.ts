export const octaves = [2, 3, 4, 5, 6];
export const whiteKeyNames = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
export const blackKeyNames = ['C#', 'D#', 'F#', 'G#', 'A#'];

export const keyNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const keyboardMap = [
  // half octave
  { code: 'Tab', key: 'F' },
  { code: 'Digit1', key: 'F#' },
  { code: 'KeyQ', key: 'G' },
  { code: 'Digit2', key: 'G#' },
  { code: 'KeyW', key: 'A' },
  { code: 'Digit3', key: 'A#' },
  { code: 'KeyE', key: 'B' },

  // full octave
  { code: 'KeyR', key: 'C' },
  { code: 'Digit5', key: 'C#' },
  { code: 'KeyT', key: 'D' },
  { code: 'Digit6', key: 'D#' },
  { code: 'KeyY', key: 'E' },
  { code: 'KeyU', key: 'F' },
  { code: 'Digit7', key: 'F#' },
  { code: 'KeyI', key: 'G' },
  { code: 'Digit8', key: 'G#' },
  { code: 'KeyO', key: 'A' },
  { code: 'Digit9', key: 'A#' },
  { code: 'KeyP', key: 'B' },

  // half octave
  { code: 'BracketLeft', key: 'C' },
  { code: 'Minus', key: 'C#' },
  { code: 'BracketRight', key: 'D' },
  { code: 'Equal', key: 'D#' },
  { code: 'Backslash', key: 'E' },
];

export const octaveMap = keyNames.map((keyName: string) => {
  return octaves.map((octave: number) => {
    return {
      key: `${keyName}${octave}`,
      color: keyName.indexOf('#') > -1 ? 'black' : 'white'
    }
  })
});
export const flatOctaveMap = octaveMap.flat();
