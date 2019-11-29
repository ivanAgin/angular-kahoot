import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProvaComponent } from './components/prova/prova.component';
import { PlayStartComponent } from './components/play/play-start/play-start.component';
import { PlayQuestionComponent } from './components/play/play-question/play-question.component';
import { PlayFinishComponent } from './components/play/play-finish/play-finish.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'prova', component: ProvaComponent},
  { path: 'play', component: PlayStartComponent},
  { path: 'play/:id/question/:id', component: PlayQuestionComponent},
  { path: 'play/:id/finish', component: PlayFinishComponent},
  { path: 'admin', component: PlayStartComponent},
  { path: 'admin/:id/question/:id', component: PlayQuestionComponent},
  { path: 'admin/:id/finish', component: PlayFinishComponent},
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
