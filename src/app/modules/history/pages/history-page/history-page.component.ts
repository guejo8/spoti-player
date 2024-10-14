import { Component, OnInit } from '@angular/core';
import { SearchService } from '@modules/history/services/search.service';
import { Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { PlayListBodyComponent } from '../../../../shared/components/play-list-body/play-list-body.component';
import { SearchComponent } from '../../components/search/search.component';

@Component({
    selector: 'app-history-page',
    templateUrl: './history-page.component.html',
    styleUrls: ['./history-page.component.css'],
    standalone: true,
    imports: [SearchComponent, PlayListBodyComponent, AsyncPipe]
})
export class HistoryPageComponent implements OnInit {
  listResults$: Observable<any> = of([])
   constructor(private searchService: SearchService) { }

  ngOnInit(): void {
  }

  receiveData(event: string): void {
    if (event.length >= 3) {
      console.log('Estoy en el padre', event); 
      this.listResults$ = this.searchService.searchTracks$(event); // Realiza la búsqueda
    } else {
      this.listResults$ = of([]); // Si no hay suficientes caracteres, resetea la lista
    }
  }
  
}