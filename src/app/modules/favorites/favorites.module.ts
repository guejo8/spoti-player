import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesFavoriteComponent } from './pages/favorites/pages-favorite/pages-favorite.component';
import { FavoritesRoutingModule } from './favorites-routing.module';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    PagesFavoriteComponent
  ],
  imports: [
    CommonModule,
    FavoritesRoutingModule,
    SharedModule
  ]
})
export class FavoritesModule { }
