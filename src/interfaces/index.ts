
export enum MachineStateMode {
  Synth = 'synth',
  Drum = 'drum',
  Tape = 'tape',
  Mixer = 'mixer'
}

export interface MachineState {
  playing: boolean;
  isReady: boolean;
  bpm: number;
  octave: number;
  note?: string|null;
  mode: MachineStateMode;
}

export interface MetronomeState {
  enabled: boolean;
}
