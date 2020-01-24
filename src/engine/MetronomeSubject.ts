import { Loop, MembraneSynth } from 'tone';
import { BaseSubject } from './BaseSubject';
import { start } from 'tone';
import { MetronomeState } from '../interfaces';

export class MetronomeSubject extends BaseSubject<MetronomeState> {
  protected store: string = 'metronome-state';

  private synth: MembraneSynth;
  private loop: Loop;

  constructor() {
    super({
      enabled: false,
    });

    this.synth = new MembraneSynth().toDestination();
    this.loop = new Loop((time) => {
      this.synth.triggerAttackRelease("C1", "8n", time)
    }, "4n");
  }

  async enable() {
    await start();

    if (this.loop.state === 'started') {
      this.loop.stop();
    } else {
      this.loop.start(0);
    }

    this.patch({
      enabled: this.loop.state === 'started' ? true : false
    });
  }
}

export default new MetronomeSubject();
