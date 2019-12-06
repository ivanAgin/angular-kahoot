import { Injectable } from '@angular/core';
import { FirebaseService } from './firebaseService/firebase-service.service';
import { Pregunta } from '../models/pregunta.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  idPartida: string;
  nomUsuari: string;
  punts: number;
  pregunta_seleccionada: string;
  preguntes:Pregunta[];

  constructor(private firebase:FirebaseService) { }

  setPartida(idPartida:string) {
    this.idPartida = idPartida;
    this.firebase.getPartida(this.idPartida).subscribe(
      data => {
        const id_set:string = data.preguntas;
        this.firebase.getSetQuestions(id_set).subscribe(
          data => {
            this.preguntes = data
            console.log(this.preguntes);
          }
        );
      }
    );
  }

}
