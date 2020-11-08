import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { StartComponent } from './start/start.component';

const routes: Routes = [
  {
    path: 'home', 
    component: HomeComponent
    
  },

  {
    path: 'start',
    component: StartComponent
  },

  {
    path: '',   
    redirectTo: '/home', 
    pathMatch: 'full' 
  },

  {
    path:'**',
    component: NotfoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
