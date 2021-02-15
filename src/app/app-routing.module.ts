import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component'
import { ListContainerComponent } from './randomizer/list-container/list-container.component'; 

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'randomizer',
    component: ListContainerComponent,
    canActivate: [AuthGuard] 
  },
  { path: '**', redirectTo: '/randomizer' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
