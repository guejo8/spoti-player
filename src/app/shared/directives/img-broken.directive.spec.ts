import { ElementRef } from '@angular/core';
import { ImgBrokenDirective } from './img-broken.directive';

describe('ImgBrokenDirective', () => {
  let elementRefMock: ElementRef;
  let directive: ImgBrokenDirective;

  beforeEach(() => {
    elementRefMock = {
      nativeElement: document.createElement('img') // Simulamos un elemento de tipo img
    };
    directive = new ImgBrokenDirective(elementRefMock); // Proveemos el mock de ElementRef
  });

  // Crear una instancia de la directiva
  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  // El src cambia cuando ocurre un error
  it('should set img src to default when handleError is called', () => {
    directive.handleError();
    expect(elementRefMock.nativeElement.src).toContain('assets/images/img-broken.jpg');
  });

  // Se llama a console.log cuando ocurre un error
  it('should log an error message to the console when handleError is called', () => {
    const consoleSpy = spyOn(console, 'log');
    directive.handleError();
    expect(consoleSpy).toHaveBeenCalledWith('Esta imagen no funciona -->', elementRefMock);
  });


  // Si no se proporciona customImg, usa la imagen por defecto
  it('should set img src to default if customImg is not provided when handleError is called', () => {
    directive.customImg = ''; // No se provee customImg
    directive.handleError();
    expect(elementRefMock.nativeElement.src).toContain('assets/images/img-broken.jpg');
  });
});
