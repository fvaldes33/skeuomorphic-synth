
export interface MachineState {
  playing: boolean;
  bpm: number;
  octave: number;
  note?: string|null;
}

export interface MetronomeState {
  enabled: boolean;
}
