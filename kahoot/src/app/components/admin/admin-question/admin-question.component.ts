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
  id_partida:string;
  pregunta_seleccionada:string;
  acertado:boolean = false;
  pregunta: Pregunta;
  name: string;
  answers_count:number = 0;
  question_count:number = 0;
  time:number = 60;
  timer;
  estadoActual = 0;
  first_counter:number = 0;
  second_counter:number = 0;
  third_counter:number = 0;
  fourth_counter:number = 0;

  constructor(
    private game: GameService,
    private realtime: FirebaseService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.name = this.game.nomUsuari;
    this.id_partida = this.route.snapshot.paramMap.get("id");
    
    this.fetchPartida(); //ja activa el timer
        
  }

  public startQuestion() {
    this.acertado = false;
    this.pregunta_seleccionada = null;
    this.first_counter = 0;
    this.second_counter = 0;
    this.third_counter = 0;
    this.fourth_counter = 0;
    this.startTimer();
  }
  
  nextQuestion(){
    this.estadoActual = (this.game.preguntes.length > this.estadoActual+1) ? this.estadoActual+1 : -2 ;
    this.realtime.changeState(this.id_partida,this.estadoActual)
  }

  stopQuestion() {
    if(this.answers_count >= this.partida.usuarios.length) {
      this.time = 0;
      clearInterval(this.timer);
    }
  }

  private startTimer() {
    //Timer
    this.time = 60;
    this.timer = setInterval(() => {
      if(this.time <= 0) {
        clearInterval(this.timer);
        this.time = 0;

      }
      else this.time--;
    }, 1000);
  }

  private fetchPartida() {
    //Obtenim partida
    this.realtime.getPartida(this.id_partida).subscribe(
      p => {
        this.checkState(p);
        this.partida = p;
        
        //Obtenim answer_count
        this.getAnswerCount();
        
      }
    );
  }

  private checkState(p:Partida){
    if(p.estado=='-2'){
      this.router.navigateByUrl(`/play/${this.id_partida}/finish`);
    }
    else if(p.estado=='-1') {
      this.router.navigateByUrl(`/play/${this.id_partida}`);
    }
    else if(!this.partida || this.partida.estado!=p.estado){
      
      //canviem
      this.realtime.getSetQuestions(p.preguntas).subscribe( //Obtenim la següent pregunta...
        data => {
          this.game.preguntes = data;
          this.game.pregunta_seleccionada = p.estado;
          this.pregunta = data[p.estado];
          this.answers_count = 0;
          this.startQuestion();
        }
      );
    }
  }


  private getAnswerCount() {
    let i = 0;
    this.first_counter = 0;
    this.second_counter = 0;
    this.third_counter = 0;
    this.fourth_counter = 0;
    if(this.partida!=null && this.partida.respuestas != null) {
      this.partida.respuestas.forEach((respuesta) => {
        if(respuesta.pregunta == this.game.pregunta_seleccionada) { //si la resposta es de la pregunta d'ara
          i++;
        }
        console.log(respuesta);
        switch(respuesta.pregunta) {
          case "0":
            this.first_counter++;
            break;
          case "1":
            this.second_counter++;
            break;
          case "2":
            this.third_counter++;
            break;
          case "3":
            this.fourth_counter++;
            break;
        }

      });
      this.answers_count = i;
    }
    else this.answers_count = 0; 
  }

}
