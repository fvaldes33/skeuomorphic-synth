import { Synth, Envelope } from 'tone';
import { Sound } from 'pts';
import { BaseSubject } from './BaseSubject';
import { SynthState } from '../interfaces';

export default class SynthSubject extends BaseSubject<SynthState> {
  protected store: string = 'synth-state';

  constructor() {
    super({
      synth: new Synth(),
      oscillator: 'triangle',
      envelope: Object.assign({}, Envelope.getDefaults(), {
        attack: 0.005,
        decay: 0.1,
        sustain: 0.3,
        release: 1
      }),
      sound: undefined
    });

    this.state.synth.toDestination();
    this.patch({
      sound: Sound.from(this.state.synth as any, this.state.synth.context as any).analyze(64),
    })
  }

  setEnvelope(values: any) {
    this.patch({
      envelope: {
        ...this.state.envelope,
        ...values
      }
    });

    this.state.synth.set({
      envelope: this.state.envelope
    })
  }
}
