import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebaseService/firebase-service.service';
import { Respuesta } from 'src/app/services/models/respuesta.model';

@Component({
  selector: 'app-prova',
  templateUrl: './prova.component.html',
  styleUrls: ['./prova.component.css']
})
export class ProvaComponent implements OnInit {

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    /*this.firebaseService.getPartides().subscribe( data => {
      console.log(data)
    })
    this.firebaseService.getPartida('Xo2ebUaeFpfoTJtMuLyL').subscribe( data => {
      console.log(data)
    })
    this.firebaseService.getRespuestasDePartida('Xo2ebUaeFpfoTJtMuLyL').subscribe( data => {
      console.log(data)
    })
    let respuesta = new Respuesta('pregunta2', 'respuesta3', 'usuario1')
    this.firebaseService.setAnswer('Xo2ebUaeFpfoTJtMuLyL', respuesta);
    this.firebaseService.changePoints('Xo2ebUaeFpfoTJtMuLyL','usuario1','100');
    this.firebaseService.join('Xo2ebUaeFpfoTJtMuLyL','Juanito')
    this.firebaseService.unjoin('Xo2ebUaeFpfoTJtMuLyL', 'Pol')
    this.firebaseService.createPartida("partida_prova","set1",["Ivan","Martin"])*/
  }

}
