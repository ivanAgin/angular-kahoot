import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http'

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProvaComponent } from './components/prova/prova.component';
import { environment } from 'src/environments/environment';

const fireConfig = {
  apiKey: "AIzaSyCsRAF0JSzF0xUWqUxYaQwhO9kdnXMD7r8",
  authDomain: "kahoot-angular.firebaseapp.com",
  databaseURL: "https://kahoot-angular.firebaseio.com",
  projectId: "kahoot-angular",
  storageBucket: "kahoot-angular.appspot.com",
  messagingSenderId: "913948753595",
  appId: "1:913948753595:web:2fbc7636d0cbde6d36f39e",
  measurementId: "G-RZ50M86NKC"
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProvaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(fireConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule // storage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
