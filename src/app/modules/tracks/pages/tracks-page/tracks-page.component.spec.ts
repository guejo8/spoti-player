import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { TracksPageComponent } from './tracks-page.component';
import { SharedModule } from 'src/app/shared/shared.module'; 
// Añade otros servicios que el componente pueda usar

describe('TracksPageComponent', () => {
  let component: TracksPageComponent;
  let fixture: ComponentFixture<TracksPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [
        HttpClientTestingModule,
        SharedModule,
        TracksPageComponent
    ],
})
    .compileComponents();  // Compila el componente y las dependencias
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TracksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();  
  });

  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
