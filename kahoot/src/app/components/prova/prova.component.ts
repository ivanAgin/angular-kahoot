import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/firebaseService/firebase-service.service';
import { Respuesta } from 'src/app/models/respuesta.model';

@Component({
  selector: 'app-prova',
  templateUrl: './prova.component.html',
  styleUrls: ['./prova.component.css']
})
export class ProvaComponent implements OnInit {
  puntos
  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    /*this.firebaseService.getPartides().subscribe( data => {
      console.log(data)
    })*/
    /*this.firebaseService.getPartida('partida1').subscribe( data => {
      console.log(data)
    })*/
    /*this.firebaseService.getRespuestasDePartida('partida1').subscribe( data => {
      console.log(data)
    })*/
    /*let respuesta = new Respuesta('pregunta2', 'respuesta3', 'usuario1')
    this.firebaseService.setAnswer('partida1', respuesta);*/
    //this.firebaseService.changePoints('partida1','usuario1',1000);
    //this.firebaseService.join('partida1', 'Juanito')
    //this.firebaseService.unjoin('partida1', 'Juanito')
    /*this.firebaseService.createPartida("partida_prova","set1",["Ivan","Martin"])
    this.firebaseService.getWinners('partida1').subscribe(data => {
      console.log(data)
    })
    this.firebaseService.changePoints('partida1','Pol',0);*/
  }

}
