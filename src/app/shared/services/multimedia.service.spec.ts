import { TestBed } from '@angular/core/testing';
import { MultimediaService } from './multimedia.service';
import { TrackModel } from './../../core/models/tracks.model';

describe('MultimediaService', () => {
  let service: MultimediaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultimediaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load a track when setAudio() is called', () => {
    const track: TrackModel = { 
      _id: '1', 
      name: 'Test Track', 
      url: 'http://example.com/test.mp3', 
      album: 'Test Album',  
      cover: 'http://example.com/cover.jpg'  
    };
    spyOn(service.audio, 'play');  // Espía el método play()

    service.setAudio(track);

    expect(service.audio.src).toBe(track.url);  // Verifica que la URL se asignó correctamente
    expect(service.audio.play).toHaveBeenCalled();  // Verifica que se invocó el método play()
  });

  it('should play audio when togglePlayer() is called and audio is paused', () => {
    spyOnProperty(service.audio, 'paused').and.returnValue(true);  // Simula que el audio está pausado
    spyOn(service.audio, 'play');

    service.togglePlayer();

    expect(service.audio.play).toHaveBeenCalled();
  });

  it('should pause audio when togglePlayer() is called and audio is playing', () => {
    spyOnProperty(service.audio, 'paused').and.returnValue(false);  // Simula que el audio está reproduciendo
    spyOn(service.audio, 'pause');

    service.togglePlayer();

    expect(service.audio.pause).toHaveBeenCalled();
  });

  it('should calculate and set elapsed and remaining time when timeupdate event is triggered', () => {
    spyOnProperty(service.audio, 'duration').and.returnValue(120);  
    spyOnProperty(service.audio, 'currentTime').and.returnValue(30);  

    // Llama al método calculateTime indirectamente al disparar un evento de audio
    service['audio'].dispatchEvent(new Event('timeupdate'));  

    // Verifica los valores calculados
    expect(service.timeElapsed$.value).toBe('00:30');
    expect(service.timeRemaining$.value).toBe('-01:30');
    expect(service.playerPercentage$.value).toBe(25); 
  });

  it('should seek to the correct time when seekAudio() is called', () => {
    spyOnProperty(service.audio, 'duration').and.returnValue(100);  
    service.seekAudio(50);  

    expect(service.audio.currentTime).toBe(50);  
  });

});
