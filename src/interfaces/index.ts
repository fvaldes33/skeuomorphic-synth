import { Synth, EnvelopeOptions } from "tone";
import { Sound } from "pts";

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
  slots: any[];
}

export interface MetronomeState {
  enabled: boolean;
}

export interface SynthState {
  synth: Synth;
  oscillator: OscillatorType;
  envelope: EnvelopeOptions;
  sound?: Sound;
}

export interface SynthSubjectType extends SynthState {
  subject: any;
}
