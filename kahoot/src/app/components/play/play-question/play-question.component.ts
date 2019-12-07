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
  refUser;
  acertado = false;
  respuesta = -1;
  pregunta: Pregunta;
  name: string;
  puntos = 0;



  constructor(
    private game: GameService,
    private realtime: FirebaseService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.name = this.game.nomUsuari;
    this.id_partida = this.route.snapshot.paramMap.get("id")
    this.refUser = this.route.snapshot.paramMap.get("refUser")
    this.preguntes = this.game.preguntes
    this.realtime.getPartida(this.id_partida).subscribe(
      p => {
        this.checkState(p)
      }
    );
  }

  public checkState(p:Partida){
    if(p.estado=='-2'){
      this.router.navigateByUrl(`/play/${this.id_partida}/finish`)
    }else if(!this.partida || this.partida.estado!=p.estado){
      /* if(!this.partida){
        console.log("cambio " + p.estado)
      }else console.log("cambio " + this.partida.estado + " " + p.estado) */
      this.partida = p
      this.respuesta = -1;
      this.haRespondido = false;
      this.acertado = false;
      this.realtime.getSetQuestions(p.preguntas).subscribe(
        data => {
          this.preguntes = data
          this.pregunta = data[p.estado]
          //console.log(this.pregunta);
        }
      );
    }
  }

  public responder(p:number){
    this.respuesta = p;
    if(this.pregunta.respuestas[p]==this.pregunta.respuesta_correcta){
      this.puntos += 10
      this.realtime.changePoints(this.id_partida,this.refUser,this.puntos)
      this.acertado = true
    }
    this.haRespondido = true; 
  }

}
