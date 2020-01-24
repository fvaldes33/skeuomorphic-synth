import { start, Analyser, Synth, Transport } from 'tone';
import { BaseSubject } from './BaseSubject';
import { MachineState } from '../interfaces';

export class MachineSubject extends BaseSubject<MachineState> {
  protected store: string = 'machine-state';

  private synth: Synth = new Synth().toDestination();
  public fft: Analyser;
  public waveform: Analyser;

  constructor() {
    super({
      playing: false,
      bpm: 120,
      octave: 4,
      note: null
    });

    // defaults
    Transport.bpm.value = 120;

    this.fft = new Analyser("fft", 1024);
    this.waveform = new Analyser("waveform", 1024);

    this.synth.fan(this.waveform, this.fft);

    start();
  }

  async attack(key: string, octave: number) {
    let note = `${key}${octave}`;
    this.synth.triggerAttack(note);
    this.patch({
      note
    });
  }

  async release() {
    this.synth.triggerRelease();
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
}

export default new MachineSubject();
