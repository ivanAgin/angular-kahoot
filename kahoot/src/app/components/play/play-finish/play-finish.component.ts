import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebaseService/firebase-service.service';
import { GameService } from 'src/app/services/game.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-play-finish',
  templateUrl: './play-finish.component.html',
  styles: []
})
export class PlayFinishComponent implements OnInit {

  primero: Usuario;
  segundo: Usuario;
  tercero: Usuario;
  title:string = "Analyzing results...";

  constructor(private realtime: FirebaseService,
              private game : GameService,
              private route:  ActivatedRoute,
              private router:Router) { }

  ngOnInit() {
    this.realtime.getPartida(this.route.snapshot.paramMap.get("id")).subscribe( (partida) => {
      if(partida.usuarios){
        let sorted = partida.usuarios.sort(function (a, b) {
          return - a.puntos + b.puntos;
        })
        this.primero = (sorted[0]) ? sorted[0] : null;
        this.segundo = (sorted[1]) ? sorted[1] : null;
        this.tercero = (sorted[2]) ? sorted[2] : null;

        switch(this.game.nomUsuari) {
          case this.primero.nombre: 
            this.title = "¡Has ganado!";
            break;
          case this.segundo.nombre:
            this.title = "¡Has quedado segundo!";
            break;
          case this.tercero.nombre:
            this.title = "¡Has quedado tercero!";
            break;
          default:
            this.title = "Otra vez será...";
            break;
        }

        console.log(sorted)
      }else{
        this.title = "Ups! We don't have enought answers..."
      }
    })
  }

  finish() {
    this.router.navigateByUrl("/");
  }

}
