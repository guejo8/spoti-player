import { TrackModel } from './../../core/models/tracks.model'; 
import { EventEmitter, Injectable } from '@angular/core'; 
import { BehaviorSubject } from 'rxjs'; 

@Injectable({
  providedIn: 'root' 
})
export class MultimediaService {
  
  callback: EventEmitter<any> = new EventEmitter<any>();

  // Para manejar el estado de la pista, tiempo y estado del reproductor
  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined);
  public audio!: HTMLAudioElement; 
  public timeElapsed$: BehaviorSubject<string> = new BehaviorSubject('00:00'); 
  public timeRemaining$: BehaviorSubject<string> = new BehaviorSubject('-00:00'); 
  public playerStatus$: BehaviorSubject<string> = new BehaviorSubject('paused'); 
  public playerPercentage$: BehaviorSubject<number> = new BehaviorSubject(0); 

  constructor() {
    this.audio = new Audio(); // Inicializa el objeto Audio

    // Suscripción para manejar cambios en la pista
    this.trackInfo$.subscribe((responseOK) => {
      if (responseOK) {
        this.setAudio(responseOK); // Configura el audio si hay una nueva pista
      }
    });

    this.listenAllEvents(); 
  }

  // Para escuchar eventos de audio
  private listenAllEvents(): void {
    this.audio.addEventListener('timeupdate', this.calculateTime, false); 
    this.audio.addEventListener('playing', this.setPlayerStatus, false); 
    this.audio.addEventListener('play', this.setPlayerStatus, false); 
    this.audio.addEventListener('pause', this.setPlayerStatus, false); 
    this.audio.addEventListener('ended', this.setPlayerStatus, false); 
  }

  // Para establecer el estado del reproductor
  private setPlayerStatus = (state: any) => {
    switch (state.type) {
      case 'play':
        this.playerStatus$.next('play'); 
        break;
      case 'playing':
        this.playerStatus$.next('playing'); 
        break;
      case 'ended':
        this.playerStatus$.next('ended'); 
        break;
      default:
        this.playerStatus$.next('paused'); 
        break;
    }
  };

  // Calcular el tiempo transcurrido y restante
  private calculateTime = () => {
    const { duration, currentTime } = this.audio; 
    this.setTimeElapsed(currentTime); 
    this.setRemaining(currentTime, duration); 
    this.setPercentage(currentTime, duration); 
  };

  // Establecer el porcentaje de reproducción
  private setPercentage(currentTime: number, duration: number): void {
    const percentage = (currentTime * 100) / duration; 
    this.playerPercentage$.next(percentage); 
  }

  // Establecer el tiempo transcurrido
  private setTimeElapsed(currentTime: number): void {
    const seconds = Math.floor(currentTime % 60); 
    const minutes = Math.floor((currentTime / 60) % 60); 
    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds; 
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes; 
    const displayFormat = `${displayMinutes}:${displaySeconds}`; 
    this.timeElapsed$.next(displayFormat); 
  }

  // Establecer el tiempo restante
  private setRemaining(currentTime: number, duration: number): void {
    const timeLeft = duration - currentTime; 
    const seconds = Math.floor(timeLeft % 60); 
    const minutes = Math.floor((timeLeft / 60) % 60); 
    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds; 
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes; 
    const displayFormat = `-${displayMinutes}:${displaySeconds}`; 
    this.timeRemaining$.next(displayFormat); 
  }

  // Establecer la pista de audio
  public setAudio(track: TrackModel): void {
    console.log( 'Track loaded:', track); 
    this.audio.src = track.url; 
    this.audio.play(); 
  }


  public togglePlayer(): void {
    this.audio.paused ? this.audio.play() : this.audio.pause(); // Reproduce si está pausado, pausa si está reproduciendo
  }

  // Para buscar en la pista según un porcentaje
  public seekAudio(percentage: number): void {
    const { duration } = this.audio; 
    const percentageToSecond = (percentage * duration) / 100; 
    this.audio.currentTime = percentageToSecond; 
  }

  // Para avanzar en la pista
  public skipForward(seconds: number = 10): void {
    const newTime = this.audio.currentTime + seconds; 
    if (newTime < this.audio.duration) {
      this.audio.currentTime = newTime; 
    } else {
      this.audio.currentTime = this.audio.duration; 
    }
  }

  // Para retroceder en la pista
  public skipBackward(seconds: number = 10): void {
    const newTime = this.audio.currentTime - seconds; 
    if (newTime > 0) {
      this.audio.currentTime = newTime; 
    } else {
      this.audio.currentTime = 0; 
    }
  }
}
