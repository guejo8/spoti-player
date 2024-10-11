import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardPlayerComponent } from './card-player.component';
import { MultimediaService } from '@shared/services/multimedia.service';
import { TrackModel } from '@core/models/tracks.model';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('CardPlayerComponent', () => {
  let component: CardPlayerComponent;
  let fixture: ComponentFixture<CardPlayerComponent>;
  let multimediaServiceSpy: jasmine.SpyObj<MultimediaService>;

  beforeEach(async () => {
    // Crea un mock del servicio MultimediaService
    const multimediaSpy = jasmine.createSpyObj('MultimediaService', ['trackInfo$']);

    await TestBed.configureTestingModule({
      declarations: [CardPlayerComponent],
      providers: [
        { provide: MultimediaService, useValue: multimediaSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardPlayerComponent);
    component = fixture.componentInstance;
    multimediaServiceSpy = TestBed.inject(MultimediaService) as jasmine.SpyObj<MultimediaService>;

    fixture.detectChanges();
  });

  // Test existente: verifica que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Verificar que los valores iniciales de los Inputs son correctos
  it('should have default input values', () => {
    expect(component.mode).toBe('small');
    expect(component.track).toEqual({ _id: 0, name: '', album: '', url: '', cover: '' });
  });

});
