import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NonAuthGuard} from '@core/guards/non-auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [NonAuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
