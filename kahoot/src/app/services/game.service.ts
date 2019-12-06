import { Injectable } from '@angular/core';
import { FirebaseService } from './firebaseService/firebase-service.service';
import { Partida } from '../models/partida.model';
//import { Pregunta } from '../models/';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  idPartida: string;
  nomUsuari: string;
  punts: number;
  pregunta_seleccionada: string;
  //preguntes:Pregunta[];

  constructor(private firebase:FirebaseService) { }

  setPartida(idPartida:string) {
    this.idPartida = idPartida;
    this.firebase.getPartida(this.idPartida).subscribe(
      data => {
        const id_set:string = data.preguntas;
        //this.firebase.getSetsQuestions(id_set)
      }
    );
  }

}