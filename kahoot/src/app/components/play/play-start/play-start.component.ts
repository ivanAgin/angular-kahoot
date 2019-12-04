import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/firebaseService/firebase-service.service';

@Component({
  selector: 'app-play-start',
  templateUrl: './play-start.component.html',
  styles: []
})
export class PlayStartComponent implements OnInit {


  private users;
  private joined  = false;
  private id: string;
  private idPartida: string;
  private usuari: string;

  constructor(private activatedRoute: ActivatedRoute, private firebaseService: FirebaseService ) {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.idPartida = this.firebaseService.getPartidaByCodi(+this.id);
    this.users = this.firebaseService.getUsersDePartida(/*this.idPartida*/"partida1");    
  }

  joinGame(usuari: string) {
    this.usuari = usuari;
    this.firebaseService.join(/*codiPartida*/"partida1",usuari);
    this.joined = true;
  }

  changeName() {
    this.firebaseService.unjoin(/*codiPartida*/"partida1",this.usuari);
    this.joined = false;
  }

  ngOnInit() {
    
  }

}
