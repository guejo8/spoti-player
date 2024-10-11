import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; 
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule], 
      declarations: [SearchComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Debe emitir un evento cuando se llama a callSearch con un término válido
  it('should emit callbackData when callSearch is called with a valid term', () => {
    spyOn(component.callbackData, 'emit');  // Espía en el método emit del EventEmitter
    const term = 'test';
    component.callSearch(term);
    expect(component.callbackData.emit).toHaveBeenCalledWith(term);
  });

  // No debe emitir un evento si el término es demasiado corto
  it('should not emit callbackData when callSearch is called with a term shorter than 3 characters', () => {
    spyOn(component.callbackData, 'emit');  // Espía en el método emit del EventEmitter
    const term = 'te';
    component.callSearch(term);
    expect(component.callbackData.emit).not.toHaveBeenCalled();
  });

  // El término debe ser un string vacío por defecto
  it('should have an empty src by default', () => {
    expect(component.src).toBe('');
  });

  // Debe registrar en la consola la llamada a la API si el término es válido
  it('should log the term to the console when callSearch is called with a valid term', () => {
    const consoleSpy = spyOn(console, 'log');  // Espía en console.log
    const term = 'search term';
    component.callSearch(term);
    expect(consoleSpy).toHaveBeenCalledWith(' Llamada a nuestra API HTTP GET---> ', term);
  });

  // No debe registrar en la consola si el término es demasiado corto
  it('should not log to the console when callSearch is called with a term shorter than 3 characters', () => {
    const consoleSpy = spyOn(console, 'log');  // Espía en console.log
    const term = 'ab';
    component.callSearch(term);
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  // Debe mantener la misma referencia a src
  it('should keep src reference as string', () => {
    component.src = 'new value';
    expect(typeof component.src).toBe('string');
    expect(component.src).toBe('new value');
  });
});
