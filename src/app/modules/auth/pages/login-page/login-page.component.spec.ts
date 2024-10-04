import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { LoginPageComponent } from './login-page.component';
import {By} from '@angular/platform-browser';


describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [
        HttpClientTestingModule, 
        ReactiveFormsModule 
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  // mi prueba

  it('should return invalid data', () => {

    const mockCredentials = {
      email:"0x0x0x0x0",
      password:"11111111122225555"
    }

    const emailForm :any = component.formLogin.get('email')
    const passwordForm :any = component.formLogin.get('password')

    emailForm.setValue(mockCredentials.email)
    passwordForm.setValue(mockCredentials.password)

    expect(component.formLogin.invalid).toBeTruthy();
  });

  it('button text should be "Iniciar sesion"', () => {

    const elementRef = fixture.debugElement.query(By.css('.form-action button'))
    const getInnerText = elementRef.nativeElement.innerText

   

    expect(getInnerText).toEqual('Iniciar sesion')
  });






});
