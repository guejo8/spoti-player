import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagesFavoriteComponent } from './pages-favorite/pages-favorite.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PagesFavoriteComponent', () => {
  let component: PagesFavoriteComponent;
  let fixture: ComponentFixture<PagesFavoriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagesFavoriteComponent ],
      schemas: [ NO_ERRORS_SCHEMA ] // Agregar esto para suprimir errores de elementos desconocidos
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
