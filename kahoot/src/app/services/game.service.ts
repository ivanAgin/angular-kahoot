import { Injectable } from '@angular/core';
import { FirebaseService } from './firebaseService/firebase-service.service';
import { Pregunta } from '../models/pregunta.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  idPartida: string;
  nomUsuari: string;
  refUsuari: string;
  punts: number = 0;
  pregunta_seleccionada: string;
  preguntes:Pregunta[];

  constructor(private firebase:FirebaseService,
              private router:Router) { }

  setPartida(idPartida:string) {
    this.idPartida = idPartida;
    this.firebase.getPartida(this.idPartida).subscribe(
      data => {
        if(data == null || data.codi == undefined) {
          this.router.navigateByUrl("/");
        }

        //establim set de preguntas
        
        const id_set:string = data.preguntas;
        if(!this.preguntes) {
          this.firebase.getSetQuestions(id_set).subscribe(
            data => {
              this.preguntes = data
            }
          );
        }
      }
    );
  }

}
