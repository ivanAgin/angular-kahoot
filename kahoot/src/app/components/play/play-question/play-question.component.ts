import { Component, OnInit } from '@angular/core';
import { Pregunta } from 'src/app/models/pregunta.model';
import { GameService } from 'src/app/services/game.service';
import { FirebaseService } from 'src/app/services/firebaseService/firebase-service.service';
import { Partida } from 'src/app/models/partida.model';

@Component({
  selector: 'app-play-question',
  templateUrl: './play-question.component.html',
  styles: []
})
export class PlayQuestionComponent implements OnInit {

  haRespondido = false; //este flag es temporal para alternar en el html
  novaPregunta = false; //l'admin ha passat la pregunta
  preguntes = [];
  partida: Partida;
  index = 0;
  pregunta: Pregunta;
  name: string;



  constructor(
    private game: GameService,
    private realtime: FirebaseService) { }

  ngOnInit() {
    this.name = this.game.nomUsuari;

    this.realtime.getPartida("partida1"/*this.game.idPartida*/).subscribe(
      data => {
        console.log(data);
      }
    );
    
  }

}
