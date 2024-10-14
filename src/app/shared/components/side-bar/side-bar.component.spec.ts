import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'; 
import { SideBarComponent } from './side-bar.component';
import { Router } from '@angular/router';

describe('SideBarComponent', () => {
  let component: SideBarComponent;
  let fixture: ComponentFixture<SideBarComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [RouterTestingModule, SideBarComponent]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(SideBarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Verificar la inicialización de defaultOptions
  it('should initialize mainMenu.defaultOptions with predefined options', () => {
    expect(component.mainMenu.defaultOptions.length).toBe(3);
    expect(component.mainMenu.defaultOptions[0].name).toBe('Home');
    expect(component.mainMenu.defaultOptions[1].name).toBe('Buscar');
    expect(component.mainMenu.defaultOptions[2].name).toBe('Tu biblioteca');
  });

  // Verificar la inicialización de accessLink
  it('should initialize mainMenu.accessLink with predefined links', () => {
    expect(component.mainMenu.accessLink.length).toBe(2);
    expect(component.mainMenu.accessLink[0].name).toBe('Crear lista');
    expect(component.mainMenu.accessLink[1].name).toBe('Canciones que te gustan');
  });

  // Verificar la inicialización de customOptions
  it('should initialize customOptions with predefined custom lists', () => {
    expect(component.customOptions.length).toBe(4);
    expect(component.customOptions[0].name).toBe('Mi lista º1');
    expect(component.customOptions[3].name).toBe('Mi lista º4');
  });

  //Verificar la navegación en el método goTo
  it('should navigate to favorites with queryParams when goTo() is called', () => {
    const navigateSpy = spyOn(router, 'navigate');

    component.goTo({});  // Invocamos el método goTo

    expect(navigateSpy).toHaveBeenCalledWith(['/', 'favorites'], {
      queryParams: {
        key1: 'value1',
        key2: 'value2',
        key3: 'value3'
      }
    });
  });

  // Comprobar si el método goTo() imprime el evento en consola
  it('should log the event in console when goTo() is called', () => {
    const consoleSpy = spyOn(console, 'log');
    const mockEvent = { mock: 'event' };

    component.goTo(mockEvent);

    expect(consoleSpy).toHaveBeenCalledWith(mockEvent);
  });
});
