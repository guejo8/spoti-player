import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms'; 
import { HistoryPageComponent } from './history-page.component';
import { SearchComponent } from 'src/app/modules/history/components/search/search.component'; 
import { SharedModule } from 'src/app/shared/shared.module'; 
import { SearchService } from '@modules/history/services/search.service';
import { of } from 'rxjs';

describe('HistoryPageComponent', () => {
  let component: HistoryPageComponent;
  let fixture: ComponentFixture<HistoryPageComponent>;
  let searchService: jasmine.SpyObj<SearchService>;

  beforeEach(async () => {
    // Creamos un espía para el SearchService, simulando el método searchTracks$
    const searchServiceSpy = jasmine.createSpyObj('SearchService', ['searchTracks$']);
    
    await TestBed.configureTestingModule({
    imports: [
        HttpClientTestingModule,
        FormsModule,
        SharedModule,
        HistoryPageComponent,
        SearchComponent
    ],
    providers: [
        { provide: SearchService, useValue: searchServiceSpy } // Proporcionamos el espía como servicio
    ]
})
    .compileComponents();
    
    // Inyectamos el espía del SearchService para usarlo en las pruebas
    searchService = TestBed.inject(SearchService) as jasmine.SpyObj<SearchService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Detecta cambios iniciales en el componente después de la creación
  });

  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

 
  it('should call searchTracks$ with the correct term when receiveData is called with a valid term', (done: DoneFn) => {
    const searchTerm = 'test';
    const expectedResult = of(['result1', 'result2']); // Simulamos una respuesta con resultados
    
    searchService.searchTracks$.and.returnValue(expectedResult); // Configuramos el espía para que retorne la respuesta simulada
    
    component.receiveData(searchTerm); // Llamamos al método con el término de búsqueda
    
    expect(searchService.searchTracks$).toHaveBeenCalledWith(searchTerm); 
    component.listResults$.subscribe(results => {
      expect(results).toEqual(['result1', 'result2']); 
      done(); // para finalizar la prueba de forma segura
    });
  });

  
  it('should reset listResults$ to empty when receiveData is called with a term shorter than 3 characters', (done: DoneFn) => {
    component.receiveData('ab'); // Enviamos un término de búsqueda corto
    component.listResults$.subscribe(results => {
      expect(results).toEqual([]); // Verificamos que los resultados se resetean a un array vacío
      done();
    });
  });


  it('should not call searchTracks$ when receiveData is called with a term shorter than 3 characters', () => {
    component.receiveData('ab'); // Término de búsqueda corto
    expect(searchService.searchTracks$).not.toHaveBeenCalled(); // Asegura que no se llama al servicio
  });

  // Prueba para verificar que el término de búsqueda se registra en la consola
  it('should log the search term when receiveData is called with a valid term', () => {
    const consoleSpy = spyOn(console, 'log'); // Espía en console.log
    const searchTerm = 'search term';

    component.receiveData(searchTerm); // Llamamos al método con el término de búsqueda
    
    expect(consoleSpy).toHaveBeenCalledWith('Estoy en el padre', searchTerm); 
    expect(consoleSpy).toHaveBeenCalledTimes(1); // Aseguramos que se haya llamado solo una vez
  });
});
