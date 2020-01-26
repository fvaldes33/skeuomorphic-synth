import { Synth, AMSynth, FMSynth, MembraneSynth, MetalSynth, MonoSynth } from "tone";
import { Sound } from "pts";

export enum MachineStateMode {
  Synth = 'synth',
  Drum = 'drum',
  Tape = 'tape',
  Mixer = 'mixer'
}

export interface MachineSlot {
  type: string;
  synth: Synth | AMSynth | FMSynth | MembraneSynth | MetalSynth | MonoSynth;
  sound: Sound;
  settings?: any;
  active: boolean;
}

export interface MachineState {
  playing: boolean;
  isReady: boolean;
  bpm: number;
  octave: number;
  note?: string|null;
  mode: MachineStateMode;
  slots: MachineSlot[];
}

export interface MetronomeState {
  enabled: boolean;
}
