/* eslint-disable no-sparse-arrays */
import { song } from "../song";
import { CPlayer } from "./audio-player";
import { zzfx } from "./zzfx";

export class AudioManager {
  private started = false;
  private audio: HTMLAudioElement;
  private loaded: boolean;
  private muted: boolean;

  constructor(muted: boolean) {
    this.audio = document.createElement("audio");
    if (muted) this.toggleMute();
  }

  public prepare(): void {
    if (this.started) return;

    this.started = true;

    const player = new CPlayer();
    player.init(song);
    player.generate();
    this.loaded = false;

    const timer = setInterval(() => {
      if (this.loaded) return;
      this.loaded = player.generate() >= 1;
      if (this.loaded) {
        const wave = player.createWave();
        this.audio.src = URL.createObjectURL(
          new Blob([wave], { type: "audio/wav" }),
        );
        this.audio.loop = true;
        this.audio.volume = 0.7;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this.audio as any).preservesPitch = false;
        clearInterval(timer);
      }
    }, 5);
  }

  public setVolume(vol: number): void {
    this.audio.volume = vol;
  }

  public getPitch(): number {
    return this.audio.playbackRate;
  }

  public setPitch(target: number): void {
    if (target < 0.1) {
      this.audio.volume = 0;
      return;
    }
    this.audio.playbackRate = target;
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public toggleMuteTo(state: boolean): void {
    this.muted = state;
    if (this.muted) {
      // localStorage.setItem('KeybGameMute', '1');
      this.audio.pause();
      return;
    }
    // localStorage.removeItem('KeybGameMute');
    this.audio.play();
  }

  public toggleMute(): void {
    this.toggleMuteTo(!this.muted);
  }

  public play(): void {
    const timer = setInterval(() => {
      if (!this.loaded) return;
      if (!this.muted) this.audio.play();
      clearInterval(timer);
    }, 5);

    // restart early for better looping
    // this.audio.addEventListener('timeupdate', () => {
    //     if(this.audio.currentTime > this.audio.duration - 0.21) {
    //         this.audio.currentTime = 0;
    //         this.audio.play();
    //     }
    // });
  }

  public playEffect(values: number[]): void {
    if (!this.muted)
      zzfx(...values.map((v, i) => (i === 0 ? (v ?? 1) * 0.6 : v)));
  }

  public buttonClick(): void {
    this.playEffect([
      2.5,
      ,
      321,
      0.01,
      ,
      0.02,
      ,
      0.7,
      -62,
      -30,
      116,
      0.15,
      ,
      0.6,
      35,
      ,
      0.04,
      0.51,
      0.03,
      ,
      99,
    ]);
  }

  public buttonHover(): void {}

  public pick(): void {
    this.buttonClick();
    this.playEffect([
      1.5,
      ,
      419,
      0.02,
      0.03,
      0.01,
      3,
      3.5,
      -49,
      5,
      283,
      0.49,
      0.09,
      ,
      ,
      ,
      0.04,
      0.69,
      0.02,
      0.12,
      -1280,
    ]);
  }

  public shoot(): void {
    this.playEffect([
      2,
      ,
      419,
      0.02,
      0.03,
      0.18,
      2,
      1.5,
      14,
      8,
      ,
      ,
      ,
      ,
      ,
      0.4,
      0.17,
      0.93,
      0.19,
      ,
      305,
    ]);
  }

  public explosion(): void {
    this.playEffect([
      1.5,
      ,
      341,
      0.02,
      0.14,
      ,
      3,
      2.8,
      -14,
      15,
      ,
      ,
      0.07,
      ,
      3.4,
      0.4,
      0.04,
      0.64,
      0.18,
      0.2,
      99,
    ]);
    this.playEffect([
      2.5,
      ,
      468,
      0.01,
      0.08,
      0.11,
      4,
      2.8,
      ,
      ,
      ,
      ,
      0.1,
      1.3,
      ,
      0.3,
      0.04,
      0.46,
      0.08,
      0.3,
    ]);
  }

  public throw(): void {
    this.playEffect([
      0.6,
      ,
      528,
      0.01,
      0.05,
      0.03,
      2,
      4.4,
      -47,
      22,
      77,
      0.29,
      ,
      ,
      ,
      ,
      ,
      0.7,
      0.03,
      0.21,
      422,
    ]);
    this.playEffect([
      3.2,
      ,
      291,
      ,
      ,
      0.04,
      1,
      3.9,
      7,
      ,
      26,
      0.04,
      0.1,
      0.4,
      ,
      ,
      0.16,
      0.73,
      0.01,
      0.45,
      -1167,
    ]);
  }

  public roll(): void {
    this.playEffect([
      1.4,
      ,
      586,
      ,
      0.04,
      0.01,
      4,
      0.6,
      32,
      ,
      -1,
      0.03,
      ,
      0.4,
      ,
      ,
      0.28,
      0.72,
      0.01,
      0.31,
      -1408,
    ]);
  }

  public sail(vol: number): void {
    this.playEffect([
      vol,
      ,
      50,
      0.09,
      0.26,
      0.62,
      4,
      2.7,
      6,
      ,
      ,
      ,
      0.06,
      1.2,
      ,
      0.1,
      ,
      0.46,
      0.27,
      0.03,
      1598,
    ]);
  }

  public jump(): void {
    this.playEffect([
      0.7,
      ,
      312,
      0.01,
      0.01,
      0.06,
      ,
      2.6,
      ,
      58,
      ,
      ,
      ,
      ,
      ,
      0.1,
      ,
      0.57,
      0.09,
    ]);
  }

  public land(): void {
    this.playEffect([
      1,
      ,
      252,
      0.02,
      0.02,
      0.19,
      ,
      1.7,
      ,
      -50,
      ,
      ,
      ,
      ,
      ,
      0.1,
      0.03,
      0.91,
      0.04,
    ]);
  }

  public win(): void {
    this.playEffect([
      2.2,
      ,
      229,
      0.03,
      0.11,
      0.5,
      ,
      2.6,
      ,
      ,
      -186,
      0.06,
      0.03,
      ,
      ,
      ,
      0.12,
      0.5,
      0.17,
    ]);
  }

  public sink(): void {
    this.playEffect([
      0.8,
      ,
      35,
      0.04,
      0.08,
      0.6,
      4,
      3.4,
      5,
      ,
      ,
      ,
      ,
      0.3,
      ,
      0.1,
      ,
      0.37,
      0.19,
      ,
      1989,
    ]);
    setTimeout(
      () =>
        this.playEffect([
          0.7,
          ,
          468,
          0.06,
          0.11,
          ,
          ,
          3.2,
          -8,
          ,
          -61,
          0.07,
          0.05,
          ,
          ,
          ,
          ,
          0.91,
          0.14,
        ]),
      500,
    );
  }

  public bad(): void {
    this.playEffect([
      1.5,
      ,
      525,
      0.07,
      0.12,
      0.44,
      ,
      1.2,
      ,
      75,
      ,
      ,
      0.05,
      0.3,
      0.9,
      ,
      ,
      ,
      0.26,
      0.23,
      494,
    ]);
  }

  public warn(): void {
    this.bad();
    this.playEffect([
      ,
      ,
      326,
      ,
      0.11,
      0.45,
      1,
      0.8,
      ,
      -5,
      124,
      0.07,
      0.06,
      0.2,
      33,
      ,
      ,
      0.54,
      0.14,
      ,
      -1210,
    ]);
    // this.playEffect([0.6,,486,.09,.11,.24,1,1.3,,,20,.07,.03,,48,.1,,.62,.26,.08]);
  }

  public greet(): void {
    this.win();
    this.playEffect([
      1.5,
      ,
      444,
      0.1,
      0.13,
      0.34,
      1,
      1.2,
      ,
      ,
      -128,
      0.06,
      0.02,
      ,
      1,
      0.1,
      ,
      0.56,
      0.19,
    ]);
  }

  public incoming(): void {
    this.playEffect([
      0.5,
      ,
      541,
      0.03,
      0.16,
      0.35,
      1,
      1.5,
      3,
      1,
      ,
      ,
      0.07,
      ,
      0.6,
      ,
      ,
      0.89,
      0.17,
    ]);
    this.playEffect([
      2.5,
      ,
      93,
      0.06,
      0.01,
      0.67,
      2,
      1.6,
      ,
      3,
      ,
      ,
      ,
      0.5,
      ,
      0.6,
      0.04,
      0.32,
      0.09,
    ]);
  }
}
