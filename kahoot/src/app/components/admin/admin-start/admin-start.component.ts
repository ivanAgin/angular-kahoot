import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebaseService/firebase-service.service';
import { Partida } from 'src/app/models/partida.model';

@Component({
  selector: 'app-admin-start',
  templateUrl: './admin-start.component.html',
  styles: []
})
export class AdminStartComponent implements OnInit {

  //array_set_preguntas:SetPregunta[];
  //set_pregunta_seleccionada:SetPregunta;
  partida:Partida;
  id_partida:number = Math.floor(Math.random() * 9999) + 1000;

  constructor(private firebase:FirebaseService) { }

  ngOnInit() {
      const ret = this.firebase.createPartida(this.id_partida, "holii", "set_1");
      this.partida = this.firebase.getPartidaByCodi(this.id_partida);
      console.log(this.partida);
  }
}
