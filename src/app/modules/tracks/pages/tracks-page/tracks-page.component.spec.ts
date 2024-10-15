import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { TracksPageComponent } from './tracks-page.component';


describe('TracksPageComponent', () => {
  let component: TracksPageComponent;
  let fixture: ComponentFixture<TracksPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [
        HttpClientTestingModule,
        
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
