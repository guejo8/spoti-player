import { ComponentFixture, TestBed } from '@angular/core/testing'; 
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { LoginPageComponent } from './login-page.component';
import { AuthService } from '@modules/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;  
  let fixture: ComponentFixture<LoginPageComponent>; // Fixture para interactuar con el DOM del componente en la prueba
  let authServiceSpy: jasmine.SpyObj<AuthService>;  // Mock del servicio de autenticación
  let cookieServiceSpy: jasmine.SpyObj<CookieService>; // Mock del servicio de cookies
  let routerSpy: jasmine.SpyObj<Router>; // Mock del servicio de enrutamiento

  beforeEach(async () => {
    
    const authServiceMock = jasmine.createSpyObj('AuthService', ['sendCredentials']);
    const cookieServiceMock = jasmine.createSpyObj('CookieService', ['set']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    // Configurar el módulo de prueba, importando los módulos necesarios y proporcionando los mocks
    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent], 
      imports: [
        HttpClientTestingModule,  
        ReactiveFormsModule       
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },  
        { provide: CookieService, useValue: cookieServiceMock }, 
        { provide: Router, useValue: routerMock }  
      ]
    }).compileComponents(); // Compilar el componente y sus dependencias
    
    // Crear la instancia del componente y asignarla a la variable 'component'
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Ejecuta la detección de cambios inicial
    
    // Asignar los mocks de servicios a variables para usarlas en las pruebas
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    cookieServiceSpy = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  // Formulario es inválido con datos incorrectos
  it('should return invalid data', () => {
    const mockCredentials = {
      email: "0x0x0x0x0",  
      password: "11111111122225555" 
    };

    // Obtener los controles del formulario
    const emailForm: any = component.formLogin.get('email');
    const passwordForm: any = component.formLogin.get('password');

    // Asignar valores al formulario
    emailForm.setValue(mockCredentials.email);
    passwordForm.setValue(mockCredentials.password);

    // Comprobar que el formulario es inválido
    expect(component.formLogin.invalid).toBeTruthy();
  });

  // Verificar que el botón tiene el texto correcto
  it('button text should be "Iniciar sesion"', () => {
    const elementRef = fixture.debugElement.query(By.css('.form-action button'));  
    const getInnerText = elementRef.nativeElement.innerText; 

    expect(getInnerText).toEqual('Iniciar sesion'); 
  });

  // El formulario es válido con datos correctos
  it('should return valid form when valid credentials are entered', () => {
    const mockCredentials = {
      email: 'test@example.com', 
      password: '123456'        
    };

    component.formLogin.setValue(mockCredentials); // Asigna los valores al formulario

    expect(component.formLogin.valid).toBeTrue(); // Comprueba que el formulario es válido
  });

  
  it('should call authService.sendCredentials on form submit with valid data', () => {
    const mockCredentials = {
      email: 'test@example.com',  
      password: '123456'
    };
    const mockResponse = {
      tokenSession: 'mocked_token', // Respuesta simulada del servicio
      data: {}
    };

    authServiceSpy.sendCredentials.and.returnValue(of(mockResponse)); // Simula una respuesta exitosa del AuthService

    component.formLogin.setValue(mockCredentials); // Asigna los valores al formulario
    component.sendLogin(); // Llama al método para enviar el formulario

    // Verifica que el método sendCredentials fue llamado con los valores correctos
    expect(authServiceSpy.sendCredentials).toHaveBeenCalledWith(mockCredentials.email, mockCredentials.password);
  });

  // Verificar que se maneja correctamente un error al iniciar sesión
  it('should set errorSession to true on login error', () => {
    const mockCredentials = {
      email: 'test@example.com',  
      password: '123456'
    };
  
    // Simula un error en la respuesta del AuthService
    authServiceSpy.sendCredentials.and.returnValue(throwError(() => new Error('error')));
  
    component.formLogin.setValue(mockCredentials); // Asigna los valores al formulario
    component.sendLogin(); // Llama al método para enviar el formulario
  
    expect(component.errorSession).toBeTrue(); // Verifica que la variable 'errorSession' se establezca como verdadera
  });

  
  it('should disable the submit button if form is invalid', () => {
    const elementRef = fixture.debugElement.query(By.css('.form-action button')); // Obtiene el botón del DOM
    component.formLogin.get('email')?.setValue('');  // Establece un valor vacío en el campo email, haciendo el formulario inválido
    fixture.detectChanges(); 
    expect(elementRef.nativeElement.disabled).toBeTrue(); // Verifica que el botón esté deshabilitado
  });
});
