import { HomePageComponent } from './modules/home/pages/home-page/home-page.component';

import { Routes } from '@angular/router';
import { SessionGuard } from '@core/guards/session.guard';


export const appRoutes: Routes = [ // router-outlet (Padre)
  {
    path: 'auth', //(Public) 
    loadChildren: () => import(`./modules/auth/auth.routes`).then(m => m.authRoutes)
  },
  {
    path: '',// (Private) 
    component: HomePageComponent,
    loadChildren: () => import(`./modules/home/home.routes`).then(m => m.homeRoutes),
    canActivate: [SessionGuard]
  }
];

