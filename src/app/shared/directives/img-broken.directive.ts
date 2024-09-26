import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]'
})
export class ImgBrokenDirective {
  @Input() customImg: string = ''
  @HostListener('error') handleError(): void {
    const elNative = this.miHost.nativeElement
    console.log('Esta imagen no funciona -->', this.miHost);
    elNative.src = '../../../assets/images/img-broken.jpg'

  }

  constructor(private miHost: ElementRef) {


  }

}