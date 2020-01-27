import { Synth, Transport } from 'tone';
import { BaseSubject } from './BaseSubject';
import { MachineState, MachineStateMode, SynthSubjectType } from '../interfaces';
import SynthSubject from './SynthSubject';

export class MachineSubject extends BaseSubject<MachineState> {
  protected store: string = 'machine-state';

  // public sound: Sound;

  get subject() {
    const slot: undefined | SynthSubjectType = this.state.slots.find((slot) => slot.active);
    if (slot && slot.subject) {
      return slot.subject;
    }
    return null;
  }

  get synth() {
    const slot: undefined | SynthSubjectType = this.state.slots.find((slot) => slot.active);
    if (slot && slot.synth) {
      slot.synth.toDestination();
      return slot.synth;
    }
    return null;
  }

  get sound() {
    const slot: undefined | SynthSubjectType = this.state.slots.find((slot) => slot.active);
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
        const synth = new SynthSubject();
        return {
          active: index === 0,
          subject: synth,
          synth: synth.state.synth,
          sound: synth.state.sound
        };
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

  updateEnvelope(knob: number, value: number) {
    if (this.synth) {
      let { attack, decay, sustain, release } = this.synth.envelope;
      switch (knob) {
        case 1:
          attack = value / (360 / 2);
          break;
        case 2:
          decay = value / (360 / 2);
          break;
        case 3:
          sustain = value / (360 / 1);
          break;
        case 4:
          release = value / (360 / 3);
          break;
      }

      this.subject.setEnvelope({
        attack,
        decay,
        sustain,
        release
      });
    }
  }

  setKnobValue(knob: number, value: number) {
    const { mode } = this.state;
    switch (mode) {
      case MachineStateMode.Synth:
        this.updateEnvelope(knob, value);
        break;
    }
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
    const slots = this.state.slots.map((slot: SynthSubjectType, slotIndex: number) => {
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
