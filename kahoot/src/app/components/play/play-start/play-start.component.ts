import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebaseService/firebase-service.service';
import { Partida } from 'src/app/models/partida.model';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-play-start',
  templateUrl: './play-start.component.html',
  styles: []
})
export class PlayStartComponent implements OnInit {

  private id_partida: string;
  partida:Partida;
  participating:boolean = false;
  button_text:string = "Join Game";
  alias:string = "";

  constructor(private activatedRoute: ActivatedRoute,
              private firebase:FirebaseService,
              private router:Router,
              private game:GameService ) { }

  ngOnInit() {

    this.id_partida = this.activatedRoute.snapshot.paramMap.get("id");
    this.game.setPartida(this.id_partida)

    console.log("id_partida: " + this.id_partida);
    this.firebase.getPartida(this.id_partida).subscribe(
      data => {
        this.partida = data;
        console.log("this.partida.estado: " + this.partida.estado)
        if(this.partida.estado !== "-1") {
          console.log("Partida actualitzada estat diferent a -1...")
          if(this.participating) {
            this.game.pregunta_seleccionada = this.partida.estado; //establim pregunta
            this.router.navigateByUrl(`/play/${this.id_partida}/game`);
          }
          else { //no hem entrat a la partida
            console.log("this.participant == false");
            this.router.navigateByUrl("/");
          }
        }
      }
    );

  }

  join() {
    this.button_text = "Joining...";
    this.participating = true;
    console.log("join() --> this.participating = true")
    this.firebase.join(this.id_partida, this.alias).then((docRef) => {
        this.button_text = "Waiting to start...";
        this.game.nomUsuari = this.alias;
        this.game.punts = 0;
        this.game.refUsuari = docRef.key
        this.game.setPartida(this.id_partida);
        this.participating = true;
        //docRef.key;
      })
      .catch(function (error) {
        this.button_text = "Error";
        this.participating = false;
        //null
      });
  }

}
