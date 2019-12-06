import { Injectable } from '@angular/core';
import { Pregunta } from '../models/pregunta.model';
import { Partida } from '../models/partida.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  idPartida: string;
  nomUsuari: string;
  punts: number;

  constructor() { }
}
