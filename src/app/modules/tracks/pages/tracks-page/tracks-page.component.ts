import { TrackService } from '@modules/tracks/services/track.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { Subscription, firstValueFrom  } from 'rxjs';
import { SectionGenericComponent } from '../../../../shared/components/section-generic/section-generic.component';

@Component({
    selector: 'app-tracks-page',
    templateUrl: './tracks-page.component.html',
    styleUrls: ['./tracks-page.component.css'],
    standalone: true,
    imports: [SectionGenericComponent]
})
export class TracksPageComponent implements OnInit, OnDestroy {

  tracksTrending: Array<TrackModel> = []
  tracksRandom: Array<TrackModel> = []
  listObservers$: Array<Subscription> = []

  constructor(private trackService: TrackService) { }

  ngOnInit(): void {
     this.loadDataAll() 
     this.loadDataRandom() 
  }
  

async loadDataAll(): Promise<any> {
  this.tracksTrending = await firstValueFrom(this.trackService.getAllTracks$());
}


  loadDataRandom(): void {
    this.trackService.getAllRandom$()
      .subscribe((response: TrackModel[]) => {
        this.tracksRandom = response
      })
  }

  ngOnDestroy(): void {

  }

}