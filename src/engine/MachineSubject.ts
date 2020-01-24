import { Synth, Transport } from 'tone';
import { Sound } from 'pts';
import { BaseSubject } from './BaseSubject';
import { MachineState } from '../interfaces';

export class MachineSubject extends BaseSubject<MachineState> {
  protected store: string = 'machine-state';

  public synth: Synth;
  public sound: Sound;

  constructor() {
    super({
      playing: false,
      bpm: 120,
      octave: 4,
      note: null,
      isReady: false
    });

    this.synth = new Synth();
    this.sound = Sound.from(this.synth as any, this.synth.context as any).analyze(64);
    this.synth.toDestination();
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
    this.synth.triggerAttack(note);
  }

  async release() {
    this.patch({
      note: null
    })
    this.synth.triggerRelease();
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
}

export default new MachineSubject();
