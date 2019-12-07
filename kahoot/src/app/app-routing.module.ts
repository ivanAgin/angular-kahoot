import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProvaComponent } from './components/prova/prova.component';
import { PlayStartComponent } from './components/play/play-start/play-start.component';
import { PlayQuestionComponent } from './components/play/play-question/play-question.component';
import { PlayFinishComponent } from './components/play/play-finish/play-finish.component';
import { AdminStartComponent } from './components/admin/admin-start/admin-start.component';
import { AdminQuestionComponent } from './components/admin/admin-question/admin-question.component';
import { AdminFinishComponent } from './components/admin/admin-finish/admin-finish.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'prova', component: ProvaComponent},
  { path: 'play/:id', component: PlayStartComponent},
  { path: 'play/:id/game', component: PlayQuestionComponent},
  { path: 'play/:id/finish', component: PlayFinishComponent},
  { path: 'admin', component: AdminStartComponent},
  { path: 'admin/:id', component: AdminQuestionComponent},
  { path: 'admin/:id/finish', component: AdminFinishComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
