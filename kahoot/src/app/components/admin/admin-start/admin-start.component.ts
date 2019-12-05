import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebaseService/firebase-service.service';

@Component({
  selector: 'app-admin-start',
  templateUrl: './admin-start.component.html',
  styles: []
})
export class AdminStartComponent implements OnInit {

  //array_set_preguntas:SetPregunta[];
  //set_pregunta_seleccionada:SetPregunta;
  //partida:Partida;
  id_partida:number = Math.floor(Math.random() * 9999) + 1000;

  constructor(private firebase:FirebaseService) { }

  ngOnInit() {
    /*
      this.firebase.createPartida(this.id_partida, 'asdfasdf', this.set_pregunta_seleccionada.id).subscribe(
        data => this.partida = data,
        error => {
          console.log(error);
        }
      );
    */
  }

  /* 
  deleteUser(user ) {
    this.firebase......
  } 
  */

}
