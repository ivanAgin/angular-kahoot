import { Component, OnInit } from '@angular/core';
import { Partida } from 'src/app/models/partida.model';
import { Pregunta } from 'src/app/models/pregunta.model';
import { GameService } from 'src/app/services/game.service';
import { FirebaseService } from 'src/app/services/firebaseService/firebase-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Respuesta } from 'src/app/models/respuesta.model';

@Component({
  selector: 'app-admin-question',
  templateUrl: './admin-question.component.html',
  styles: []
})
export class AdminQuestionComponent implements OnInit {

  //Atributs de partida
  partida: Partida;
  ref_key:string;
  pregunta_seleccionada:string;
  acertado:boolean = false;
  pregunta: Pregunta;
  name: string;
  answers_count:number = 0;
  question_count:number = 0;
  time:number = 60;
  timer;
  estadoActual = 0;

  constructor(
    private game: GameService,
    private realtime: FirebaseService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.ref_key = this.route.snapshot.paramMap.get("id");
    
    this.fetchPartida(); //ja activa el timer
        
  }

  public startQuestion() {
    this.acertado = false;
    this.pregunta_seleccionada = null;
    this.startTimer();
  }
  
  nextQuestion(){
    this.estadoActual = (this.question_count>this.estadoActual+1) ? this.estadoActual+1 : -2 ;
    this.realtime.changeState(this.ref_key,this.estadoActual)
  }

  private startTimer() {
    //Timer
    this.time = 60;
    this.timer = setInterval(() => {
      if(this.time <= 0) {
        clearInterval(this.timer);
        this.nextQuestion();
      }
      else this.time--;
    }, 1000);
  }

  private fetchPartida() {
    //Obtenim partida
    this.realtime.getPartida(this.ref_key).subscribe(
      p => {
        this.getQuestions(p)
        this.partida = p;
        
        //Obtenim answer_count
        this.getAnswerCount();
        
      }
    );
  }

  private getQuestions(p:Partida){
    if(p.estado!='-2'){
      this.realtime.getSetQuestions(p.preguntas).subscribe( //Obtenim la següent pregunta...
        data => {
          this.game.preguntes = data;
          this.question_count = data.length
          this.pregunta = data[p.estado];
          this.startQuestion();
        }
      );
    }else{
      this.router.navigateByUrl(`admin/${this.ref_key}/finish`)
    }
  }


  private getAnswerCount() {
    let i = 0;
    if(this.partida!=null && this.partida.respuestas != null) {
      this.partida.respuestas.forEach((respuesta) => {
        if(respuesta.pregunta == this.game.pregunta_seleccionada) //si la resposta es de la pregunta d'ara
          i++;
      });
      this.answers_count = i;
    }
    else this.answers_count = 0; 
  }

}
