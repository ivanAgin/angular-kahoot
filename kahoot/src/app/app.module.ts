import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
/* FIREBASE */
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth'
import { AngularFireDatabaseModule, AngularFireDatabase} from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProvaComponent } from './components/prova/prova.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProvaComponent,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireDatabase,
    AngularFireModule,
    AngularFireAuth
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
