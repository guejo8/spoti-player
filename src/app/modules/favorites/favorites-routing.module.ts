import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesFavoriteComponent } from './pages/favorites/pages-favorite/pages-favorite.component';

const routes: Routes = [
  {
    path:'',
    component:PagesFavoriteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavoritesRoutingModule { }
