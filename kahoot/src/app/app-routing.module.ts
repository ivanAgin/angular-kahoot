import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProvaComponent } from './components/prova/prova.component';


const routes: Routes = [
{
  path: 'home',
  component: HomeComponent,
},
{ path: 'prova', component: ProvaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
