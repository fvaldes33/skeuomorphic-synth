import { Synth, Transport } from 'tone';
import { Sound } from 'pts';
import { BaseSubject } from './BaseSubject';
import { MachineState, MachineStateMode, MachineSlot } from '../interfaces';

export class MachineSubject extends BaseSubject<MachineState> {
  protected store: string = 'machine-state';

  // public sound: Sound;

  get synth() {
    const slot: undefined|MachineSlot = this.state.slots.find((slot) => slot.active);
    if (slot && slot.synth) {
      slot.synth.toDestination();
      return slot.synth;
    }
    return null;
  }

  get sound() {
    const slot: undefined | MachineSlot = this.state.slots.find((slot) => slot.active);
    if (slot && slot.sound) {
      return slot.sound;
    }
    return null;
  }

  constructor() {
    super({
      playing: false,
      bpm: 120,
      octave: 4,
      note: null,
      isReady: false,
      mode: MachineStateMode.Tape,
      slots: Array.from(Array(8).keys()).map((_: any, index: number) => {
        const synth = new Synth();
        return {
          type: 'Synth',
          synth: synth,
          active: index === 0,
          sound: Sound.from(synth as any, synth.context as any).analyze(64),
          settings: {}
        } as MachineSlot;
      })
    });

    this.init();
  }

  async init() {
    this.patch({
      isReady: true
    });

    Transport.bpm.value = 120;
  }

  async attack(key: string, octave: number) {
    let note = `${key}${octave}`;
    this.patch({
      note
    });
    if (this.synth) {
      this.synth.triggerAttack(note);
    }
  }

  async release() {
    if (this.synth && this.state.note) {
      (this.synth as Synth).triggerRelease();
    }
    this.patch({
      note: null
    })
  }

  play() {
    Transport.start();

    this.patch({
      playing: Transport.state !== 'started' ? false : true
    })
  }

  stop() {
    Transport.stop();

    this.patch({
      playing: Transport.state !== 'started' ? false : true
    })
  }

  setOctave(value: number) {
    this.patch({
      octave: value
    })
  }

  setBpm(value: number) {
    Transport.bpm.value = value;
    this.patch({
      bpm: value
    })
  }

  setMode(value: MachineStateMode) {
    this.patch({
      mode: value
    })
  }

  setSynth(index: number) {
    const slots = this.state.slots.map((slot: MachineSlot, slotIndex: number) => {
      return {
        ...slot,
        active: slotIndex === index
      }
    });
    this.patch({
      slots
    })
  }
}

export default new MachineSubject();
