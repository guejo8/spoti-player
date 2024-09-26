import { Component,OnInit,OnDestroy } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { response } from 'express';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrl: './media-player.component.css'
})
export class MediaPlayerComponent implements OnInit, OnDestroy{
  mockOver: TrackModel = {
    
    cover: 'https://www.prensalibre.com/wp-content/uploads/2020/06/55003233444_1.jpg?resize=2048,1363',
    album: 'QUEEN',
    name: 'The night comes down',
    url:  'http://localhost:3000/track-3.mp3',
    _id: 1
  };

  Observerslist$:Array <Subscription>=[]

  constructor(private multimediaService: MultimediaService) {}

  ngOnInit(): void {
    const observer1: Subscription = this.multimediaService.callback.subscribe(
      (response: TrackModel) => {
        console.log ('recibiendo una cancion...',response);
        
      }
    )
    this.Observerslist$=[observer1] 
  }

  ngOnDestroy(): void {
    this.Observerslist$.forEach(u => u.unsubscribe)
      
  }
}