/**
 * Web Audio API Music Box & Sound Effects
 * Dependable, zero-external-dependencies, magical emotional music box tone
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isPlayingMusic: boolean = false;
  private musicTimeout: number | null = null;
  private currentNoteIndex: number = 0;
  private volumeGain: GainNode | null = null;
  private isMuted: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.volumeGain = this.ctx.createGain();
      this.volumeGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      this.volumeGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Synthesis of a music box / celesta chime tone
  private playBellTone(freq: number, duration: number = 1.2, velocity: number = 0.5) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.volumeGain) return;

    const now = this.ctx.currentTime;
    
    // Fundamental oscillator (sine)
    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    // Subtle harmonic overtone (celesta chime sparkle)
    const osc2 = this.ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2.01, now);

    // Overtone 3 (high sparkle)
    const osc3 = this.ctx.createOscillator();
    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(freq * 3.02, now);

    const noteGain = this.ctx.createGain();
    noteGain.gain.setValueAtTime(0.001, now);
    // Instant attack, organic bell exponential decay
    noteGain.gain.exponentialRampToValueAtTime(velocity * 0.45, now + 0.015);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    const overtoneGain = this.ctx.createGain();
    overtoneGain.gain.setValueAtTime(velocity * 0.15, now);
    overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + (duration * 0.6));

    osc1.connect(noteGain);
    osc2.connect(overtoneGain);
    osc3.connect(overtoneGain);

    overtoneGain.connect(noteGain);
    noteGain.connect(this.volumeGain);

    osc1.start(now);
    osc2.start(now);
    osc3.start(now);

    osc1.stop(now + duration + 0.1);
    osc2.stop(now + duration + 0.1);
    osc3.stop(now + duration + 0.1);
  }

  // Musical notes frequencies (Hz)
  private notes: { [key: string]: number } = {
    C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
    C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00, B5: 987.77,
    C6: 1046.50
  };

  // Tender, emotional music-box melody of Happy Birthday with gentle harmonic accompaniment
  private melodySequence: Array<{ note: string; duration: number; delay: number; harmony?: string }> = [
    // Phrase 1: "Happy Birthday to You"
    { note: 'G4', duration: 0.8, delay: 420 },
    { note: 'G4', duration: 0.8, delay: 420 },
    { note: 'A4', duration: 1.2, delay: 750, harmony: 'C4' },
    { note: 'G4', duration: 1.2, delay: 750, harmony: 'E4' },
    { note: 'C5', duration: 1.4, delay: 750, harmony: 'G4' },
    { note: 'B4', duration: 2.0, delay: 1300, harmony: 'E4' },

    // Phrase 2: "Happy Birthday to You"
    { note: 'G4', duration: 0.8, delay: 420 },
    { note: 'G4', duration: 0.8, delay: 420 },
    { note: 'A4', duration: 1.2, delay: 750, harmony: 'D4' },
    { note: 'G4', duration: 1.2, delay: 750, harmony: 'F4' },
    { note: 'D5', duration: 1.4, delay: 750, harmony: 'G4' },
    { note: 'C5', duration: 2.0, delay: 1300, harmony: 'E4' },

    // Phrase 3: "Happy Birthday Dear Butt Sahiba"
    { note: 'G4', duration: 0.8, delay: 420 },
    { note: 'G4', duration: 0.8, delay: 420 },
    { note: 'G5', duration: 1.4, delay: 800, harmony: 'E5' },
    { note: 'E5', duration: 1.2, delay: 750, harmony: 'C5' },
    { note: 'C5', duration: 1.2, delay: 750, harmony: 'A4' },
    { note: 'B4', duration: 1.2, delay: 750, harmony: 'G4' },
    { note: 'A4', duration: 2.2, delay: 1300, harmony: 'F4' },

    // Phrase 4: "Happy Birthday to You"
    { note: 'F5', duration: 0.8, delay: 420, harmony: 'D5' },
    { note: 'F5', duration: 0.8, delay: 420 },
    { note: 'E5', duration: 1.2, delay: 750, harmony: 'C5' },
    { note: 'C5', duration: 1.2, delay: 750, harmony: 'G4' },
    { note: 'D5', duration: 1.4, delay: 750, harmony: 'F4' },
    { note: 'C5', duration: 2.8, delay: 2000, harmony: 'C4' },
  ];

  public toggleMusic(): boolean {
    if (this.isPlayingMusic) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  public startMusic() {
    this.initContext();
    this.isPlayingMusic = true;
    this.stepMelody();
  }

  public stopMusic() {
    this.isPlayingMusic = false;
    if (this.musicTimeout) {
      window.clearTimeout(this.musicTimeout);
      this.musicTimeout = null;
    }
  }

  public isPlaying(): boolean {
    return this.isPlayingMusic;
  }

  private stepMelody = () => {
    if (!this.isPlayingMusic) return;

    const current = this.melodySequence[this.currentNoteIndex];
    const freq = this.notes[current.note];

    if (freq) {
      this.playBellTone(freq, current.duration, 0.45);
      if (current.harmony && this.notes[current.harmony]) {
        this.playBellTone(this.notes[current.harmony], current.duration * 1.1, 0.25);
      }
    }

    this.currentNoteIndex = (this.currentNoteIndex + 1) % this.melodySequence.length;

    this.musicTimeout = window.setTimeout(() => {
      this.stepMelody();
    }, current.delay);
  };

  // Sparkly bell chime for clicks/hovers
  public playChime() {
    this.initContext();
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      window.setTimeout(() => {
        this.playBellTone(freq, 0.7, 0.25);
      }, idx * 60);
    });
  }

  // Gentle blowing whoosh & extinguishment chime
  public playBlowCandle() {
    this.initContext();
    if (!this.ctx || !this.volumeGain) return;
    const now = this.ctx.currentTime;

    // Breath / soft air noise
    const bufferSize = this.ctx.sampleRate * 0.4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.12;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, now);
    filter.frequency.linearRampToValueAtTime(150, now + 0.35);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.01, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.3, now + 0.08);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.volumeGain);

    noise.start(now);
    noise.stop(now + 0.4);

    // Delicate star chime right after blow
    window.setTimeout(() => {
      this.playBellTone(880, 0.9, 0.3);
      this.playBellTone(1174.66, 0.9, 0.2);
    }, 150);
  }

  // Festive celebration pop & fanfare chime
  public playCelebrationFanfare() {
    this.initContext();
    const chord = [392.00, 523.25, 659.25, 783.99, 1046.50];
    chord.forEach((freq, i) => {
      window.setTimeout(() => {
        this.playBellTone(freq, 1.8, 0.4);
      }, i * 90);
    });
  }

  // Cute balloon pop sound effect
  public playPop() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.volumeGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.08);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(this.volumeGain);

    osc.start(now);
    osc.stop(now + 0.1);

    window.setTimeout(() => {
      this.playBellTone(1046.50, 0.5, 0.25);
    }, 40);
  }
}

export const sound = new SoundEngine();
