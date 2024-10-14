import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core'; 
import { TrackModel } from '@core/models/tracks.model'; 
import { MultimediaService } from '@shared/services/multimedia.service'; 
import { Subscription } from 'rxjs';
import { NgTemplateOutlet, NgIf, NgClass, AsyncPipe } from '@angular/common'; 


@Component({
    selector: 'app-media-player',
    templateUrl: './media-player.component.html',
    styleUrls: ['./media-player.component.css'],
    standalone: true,
    imports: [NgTemplateOutlet, NgIf, NgClass, AsyncPipe]
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef(''); // Referencia al elemento de la barra de progreso
  listObservers$: Array<Subscription> = []; 
  state: string = 'paused'; 

  constructor(public multimediaService: MultimediaService) { } 

  ngOnInit(): void {
    
    const observer1$ = this.multimediaService.playerStatus$
      .subscribe(status => this.state = status); 
    this.listObservers$ = [observer1$]; 
  }

  ngOnDestroy(): void {
    
    this.listObservers$.forEach(u => u.unsubscribe());
    console.log(' destruido '); 
  }

  // Maneja el clic en la barra de progreso para buscar en la pista
  handlePosition(event: MouseEvent): void {
    const elNative: HTMLElement = this.progressBar.nativeElement; 
    const { clientX } = event; 
    const { x, width } = elNative.getBoundingClientRect(); 
    const clickX = clientX - x; // Calcula la posición relativa del clic
    const percentageFromX = (clickX * 100) / width; // Calcula el porcentaje de la barra de progreso
    console.log(`Click(x): ${percentageFromX}`);
    this.multimediaService.seekAudio(percentageFromX); 
  }
}
