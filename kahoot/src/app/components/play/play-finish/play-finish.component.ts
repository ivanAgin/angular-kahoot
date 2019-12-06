import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebaseService/firebase-service.service';
import { GameService } from 'src/app/services/game.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-play-finish',
  templateUrl: './play-finish.component.html',
  styles: []
})
export class PlayFinishComponent implements OnInit {

  constructor(private realtime: FirebaseService,
              private game : GameService,
              private route:  ActivatedRoute) { }

  async ngOnInit() {
    this.realtime.join(this.route.snapshot.paramMap.get("id"), "Pol")
    this.realtime.join(this.route.snapshot.paramMap.get("id"), "Ivan")
    this.realtime.join(this.route.snapshot.paramMap.get("id"), "Martin")
    this.realtime.join(this.route.snapshot.paramMap.get("id"), "Juanito")
    this.realtime.join(this.route.snapshot.paramMap.get("id"),"Alex")
    this.realtime.getPartida(this.route.snapshot.paramMap.get("id")).subscribe( (partida) => {
      console.log(partida)
    })
  }

}
