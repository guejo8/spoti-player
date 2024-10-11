import { TestBed } from '@angular/core/testing'; 
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { AuthService } from './auth.service'; 
import * as mockRaw from '../../../data/user.json'; 
import { of } from 'rxjs'; 

describe('AuthService', () => {
  let service: AuthService; 
  let mockUser: any = (mockRaw as any).default;  
  let httpClientSpy: { post: jasmine.Spy }; 
  
  beforeEach(() => {
    // Bloque que se ejecuta antes de cada prueba. Se usa para inicializar el entorno de prueba.

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      
    });

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']); 
    service = new AuthService(httpClientSpy as any);  
  });

  it('should be created', () => {
    
    expect(service).toBeTruthy(); 
    
  });

  it('should return an object with "data" and "token session"', (done: DoneFn) => {
    // Prueba para verificar que el método sendCredentials retorne un objeto con las propiedades 'data' y 'tokenSession'.

    const user: any = mockUser.userOk; 
    

    const mockResponse = {
      data: {}, 
      tokenSession: '0x0x99'
      
    };

    httpClientSpy.post.and.returnValue(of(mockResponse)); 
    // Configura el espía para que el método 'post' retorne un observable que emite 'mockResponse'.

    service.sendCredentials(user.email, user.password)
    .subscribe(responseApi => {
      // Se llama al método sendCredentials del AuthService con el email y password del usuario de prueba.

      const getProperties = Object.keys(responseApi); 
      // Obtiene las claves del objeto de respuesta.

      expect(getProperties).toContain('data'); 
     

      expect(getProperties).toContain('tokenSession'); 
      

      done(); 
      // Llama a 'done' para indicar que la prueba asíncrona ha finalizado.
    });
  });
});
