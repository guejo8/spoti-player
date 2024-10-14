import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesFavoriteComponent } from './pages/favorites/pages-favorite/pages-favorite.component';
import { FavoritesRoutingModule } from './favorites-routing.module';



@NgModule({
    imports: [
    CommonModule,
    FavoritesRoutingModule,
    PagesFavoriteComponent
]
})
export class FavoritesModule { }
