
export interface MachineState {
  playing: boolean;
  isReady: boolean;
  bpm: number;
  octave: number;
  note?: string|null;
}

export interface MetronomeState {
  enabled: boolean;
}
