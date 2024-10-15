
import { Routes } from '@angular/router';


export const homeRoutes: Routes = [
  {
    path:'tracks',
    loadChildren: () => import('@modules/tracks/tracks.routes').then(m => m.tracksRoutes)
  },

  {
    path: 'favorites',
    loadChildren: () => import('@modules/favorites/favorites.routes').then(m => m.favoriteRoutes)
  },
  {
    path: 'history',
    loadChildren: () => import('@modules/history/history.routes').then(m => m.historyRoutes)
  },
  {
    path: '**',// 404 cuando no existe la ruta
    redirectTo: '/tracks'
  }

  
];

