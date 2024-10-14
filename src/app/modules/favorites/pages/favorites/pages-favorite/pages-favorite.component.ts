import { Component, OnInit } from '@angular/core';
import { PlayListBodyComponent } from '../../../../../shared/components/play-list-body/play-list-body.component';
import { PlayListHeaderComponent } from '../../../../../shared/components/play-list-header/play-list-header.component';

@Component({
    selector: 'app-pages-favorite',
    templateUrl: './pages-favorite.component.html',
    styleUrls: ['./pages-favorite.component.css'],
    standalone: true,
    imports: [PlayListHeaderComponent, PlayListBodyComponent]
})
export class PagesFavoriteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
