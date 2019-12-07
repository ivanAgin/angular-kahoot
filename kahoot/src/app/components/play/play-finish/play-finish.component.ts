import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebaseService/firebase-service.service';
import { GameService } from 'src/app/services/game.service';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private realtime: FirebaseService,
              private game : GameService,
              private route:  ActivatedRoute) { }

  ngOnInit() {
    this.realtime.getPartida(this.route.snapshot.paramMap.get("id")).subscribe( (partida) => {
      let sorted = partida.usuarios.sort(function (a, b) {
        return - a.puntos + b.puntos;
      })
      this.primero = (sorted[0]) ? sorted[0] : null;
      this.segundo = (sorted[1]) ? sorted[1] : null;
      this.tercero = (sorted[2]) ? sorted[2] : null;

      console.log(sorted)
    })
  }

}
