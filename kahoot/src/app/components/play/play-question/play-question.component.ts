import { Component, OnInit } from '@angular/core';
import { Pregunta } from 'src/app/models/pregunta.model';
import { GameService } from 'src/app/services/game.service';
import { FirebaseService } from 'src/app/services/firebaseService/firebase-service.service';
import { Partida } from 'src/app/models/partida.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

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
  id_partida;
  acertado = false;
  respuesta:number = -1;
  pregunta: Pregunta;
  name: string;
  answers_count:number;


  constructor(
    private game: GameService,
    private realtime: FirebaseService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.name = this.game.nomUsuari;
    this.id_partida = this.route.snapshot.paramMap.get("id");
    this.preguntes = this.game.preguntes;
    this.realtime.getPartida(this.id_partida).subscribe(
      p => {
        this.checkState(p)
        this.partida = p;
        
        //Obtenim answer_count
        let i = 0;
        this.partida.respuestas.forEach((respuesta) => {
          if(respuesta.pregunta == this.game.preguntes[this.game.pregunta_seleccionada].pregunta) //si la resposta es de la pregunta d'ara
            i++;
        });
        this.answers_count = i;

        
      }
    );
  }

  public checkState(p:Partida){
    if(p.estado=='-2'){
      this.router.navigateByUrl(`/play/${this.id_partida}/finish`);
    }else if(!this.partida || this.partida.estado!=p.estado){
      this.respuesta = -1;
      this.haRespondido = false;
      this.acertado = false;
      this.realtime.getSetQuestions(p.preguntas).subscribe(
        data => {
          this.preguntes = data
          this.pregunta = data[p.estado]
        }
      );
    }
  }

  public responder(p:number){
    this.respuesta = p;
    if(this.pregunta.respuestas[p]==this.pregunta.respuesta_correcta){
      this.game.punts += 10;
      this.realtime.changePoints(this.id_partida,this.game.refUsuari,this.game.punts)
      this.acertado = true
    }
    this.haRespondido = true; 
  }

}
