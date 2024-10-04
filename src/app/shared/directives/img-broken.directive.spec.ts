import { ElementRef } from '@angular/core';
import { ImgBrokenDirective } from './img-broken.directive';

describe('ImgBrokenDirective', () => {
  let elementRefMock: ElementRef;

  beforeEach(() => {
    elementRefMock = {
      nativeElement: document.createElement('img') // Simulamos un elemento de tipo img
    };
  });

  it('should create an instance', () => {
    const directive = new ImgBrokenDirective(elementRefMock); // Proveemos el mock de ElementRef
    expect(directive).toBeTruthy();
  });
});
