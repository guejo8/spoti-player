import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayListBodyComponent } from './play-list-body.component';
import { OrderListPipe } from 'src/app/shared/pipe/order-list.pipe'; 
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';

describe('PlayListBodyComponent', () => {
  let component: PlayListBodyComponent;
  let fixture: ComponentFixture<PlayListBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        PlayListBodyComponent,
        OrderListPipe 
      ],
      schemas: [ NO_ERRORS_SCHEMA ] // Esto es opcional
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayListBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test existente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Inicialización correcta de propiedades
  it('should have default optionSort with property null and order asc', () => {
    expect(component.optionSort).toEqual({ property: null, order: 'asc' });
  });

  // El cambio de orden funciona correctamente
  it('should change order to desc when changeSort is called with same property', () => {
    component.changeSort('name');
    expect(component.optionSort).toEqual({ property: 'name', order: 'desc' });
  });

  // La propiedad de ordenación cambia correctamente
  it('should change property to "artist" and reset order to asc if called twice', () => {
    component.changeSort('name');
    expect(component.optionSort).toEqual({ property: 'name', order: 'desc' });

    component.changeSort('artist');
    expect(component.optionSort).toEqual({ property: 'artist', order: 'asc' });
  });

  // El método changeSort hace el toggle de asc a desc
  it('should toggle order between asc and desc on repeated calls', () => {
    component.changeSort('name');
    expect(component.optionSort.order).toBe('desc');
    
    component.changeSort('name');
    expect(component.optionSort.order).toBe('asc');
  });
});
