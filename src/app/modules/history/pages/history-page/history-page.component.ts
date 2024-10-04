import { Component, OnInit } from '@angular/core';
import { SearchService } from '@modules/history/services/search.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
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