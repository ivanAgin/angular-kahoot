import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebaseService/firebase-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  codi_partida: number;

  constructor(private firebase:FirebaseService) { }

  ngOnInit() {
  }

  newGame() {
    this.firebase.
  }

}
