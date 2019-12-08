import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebaseService/firebase-service.service';
import { Partida } from 'src/app/models/partida.model';
import { GameService } from 'src/app/services/game.service';

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
  ref_key;
  nombre;
  questions: string[] = [];
  set: string = ""
  
  constructor(private activatedRoute: ActivatedRoute,
    private firebase:FirebaseService,
    private router:Router,
    private game:GameService) { }

  ngOnInit() {
    this.firebase.getSetsQuestions().subscribe( (q) => {
      q.forEach( question => {
        this.questions.push(question.key)
      })
    })
  }

  iniciPartida(){
    this.firebase.changeState(this.ref_key,0);
    console.log(this.id_partida);
    this.router.navigateByUrl(`/admin/${this.ref_key}/game`);
  }

  createPartida(){
    console.log(this.set)
    if(this.set && this.nombre){
      this.firebase.createPartida(this.id_partida.toString(), this.nombre, this.set, -1).then(
        ref => {
          this.ref_key = ref.key; 
          this.game.setPartida(this.ref_key);
          this.firebase.getPartida(ref.key).subscribe(
            data => {
              this.partida = data;
              console.log(data);
            }
          );
        }
      )
    }
  }

}
