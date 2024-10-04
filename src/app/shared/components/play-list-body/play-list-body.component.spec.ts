import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayListBodyComponent } from './play-list-body.component';
import { OrderListPipe } from 'src/app/shared/pipe/order-list.pipe'; 
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PlayListBodyComponent', () => {
  let component: PlayListBodyComponent;
  let fixture: ComponentFixture<PlayListBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        PlayListBodyComponent,
        OrderListPipe // Declarar la tubería aquí
      ],
      schemas: [ NO_ERRORS_SCHEMA ] // Esto es opcional, pero se puede dejar si no se necesita validar otros elementos
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayListBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
