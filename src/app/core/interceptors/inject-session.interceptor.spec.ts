import { TestBed } from '@angular/core/testing'; 
import { HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http'; 
import { of } from 'rxjs'; 
import { CookieService } from 'ngx-cookie-service'; 
import { InjectSessionInterceptor } from './inject-session.interceptor'; 

describe('InjectSessionInterceptor', () => {
  let interceptor: InjectSessionInterceptor; 
  let cookieServiceSpy: jasmine.SpyObj<CookieService>; 
  let httpHandlerSpy: jasmine.SpyObj<HttpHandler>;

  beforeEach(() => {
    // Configuración antes de cada prueba.
    const cookieServiceMock = jasmine.createSpyObj('CookieService', ['get']); // Crea un espía del servicio de cookies que simula el método 'get'.
    const httpHandlerMock = jasmine.createSpyObj('HttpHandler', ['handle']); // Crea un espía del manejador HTTP que simula el método 'handle'.

    TestBed.configureTestingModule({
      // Configura el entorno de pruebas e inyecta dependencias.
      providers: [
        InjectSessionInterceptor, 
        { provide: CookieService, useValue: cookieServiceMock }, 
        { provide: HttpHandler, useValue: httpHandlerMock } 
      ]
    });

   
    interceptor = TestBed.inject(InjectSessionInterceptor);
    cookieServiceSpy = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;
    httpHandlerSpy = TestBed.inject(HttpHandler) as jasmine.SpyObj<HttpHandler>;
  });

  it('should add the token from the cookie to the request headers', () => {
    
    const token = 'mocked_token'; 
    cookieServiceSpy.get.and.returnValue(token); // Simula que el método 'get' del servicio de cookies devuelve el token.

    const httpRequestMock = new HttpRequest('GET', '/test-url'); // Crea una solicitud HTTP simulada.
    const expectedRequest = httpRequestMock.clone({ // Clona la solicitud y agrega las cabeceras.
      setHeaders: {
        authorization: `Bearer ${token}`, 
        CUSTOM_HEADER: 'HOLA' 
      }
    });

    httpHandlerSpy.handle.and.returnValue(of({} as HttpEvent<any>)); // Simula la respuesta del manejador HTTP.
    interceptor.intercept(httpRequestMock, httpHandlerSpy); // Llama al método 'intercept' del interceptor.

    // Comprueba que se haya llamado al método 'get' del servicio de cookies con el nombre 'token'.
    expect(cookieServiceSpy.get).toHaveBeenCalledWith('token');
    // Comprueba que el manejador HTTP se haya llamado con la solicitud esperada.
    expect(httpHandlerSpy.handle).toHaveBeenCalledWith(expectedRequest);
  });

  it('should add CUSTOM_HEADER to the request', () => {
    
    cookieServiceSpy.get.and.returnValue('any_token'); // Simula que el método 'get' devuelve un token genérico.

    const httpRequestMock = new HttpRequest('GET', '/test-url'); 
    const expectedRequest = httpRequestMock.clone({ // Clona la solicitud y agrega las cabeceras.
      setHeaders: {
        authorization: 'Bearer any_token', 
        CUSTOM_HEADER: 'HOLA' 
      }
    });

    httpHandlerSpy.handle.and.returnValue(of({} as HttpEvent<any>)); // Simula la respuesta del manejador HTTP.
    interceptor.intercept(httpRequestMock, httpHandlerSpy); // Llama al método 'intercept' del interceptor.

    // Comprueba que el manejador HTTP se haya llamado con la solicitud esperada.
    expect(httpHandlerSpy.handle).toHaveBeenCalledWith(expectedRequest);
    // Comprueba que la cabecera personalizada se haya establecido correctamente.
    expect(expectedRequest.headers.get('CUSTOM_HEADER')).toBe('HOLA');
  });

  it('should handle errors and pass the original request', () => {
    // Verifica el manejo de errores al intentar obtener el token de la cookie.
    cookieServiceSpy.get.and.throwError('Error simulada'); 

    const httpRequestMock = new HttpRequest('GET', '/test-url'); 
    
    httpHandlerSpy.handle.and.returnValue(of({} as HttpEvent<any>)); 
    interceptor.intercept(httpRequestMock, httpHandlerSpy); 

    
    expect(httpHandlerSpy.handle).toHaveBeenCalledWith(httpRequestMock);
    
    expect(cookieServiceSpy.get).toHaveBeenCalledWith('token');
  });
});
