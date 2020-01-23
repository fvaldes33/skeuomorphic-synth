import { start, Synth } from 'tone';

export const synth = new Synth().toDestination();

export const playNote = async (key: string, octave: number) => {
  let note = `${key}${octave}`;

  console.log('play', note);

  await start();
  synth.triggerAttackRelease(note, "8n");
}

export { start };
