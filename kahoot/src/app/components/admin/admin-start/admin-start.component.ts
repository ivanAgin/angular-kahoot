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
  
  constructor(private activatedRoute: ActivatedRoute,
    private firebase:FirebaseService,
    private router:Router,
    private game:GameService) { }

  ngOnInit() {
      this.firebase.createPartida(this.id_partida.toString(), "holii", "set_1", -1).then(
        ref => {
          this.ref_key = ref.key; 
          this.game.setPartida(this.ref_key);
          this.firebase.getPartida(ref.key).subscribe(
            data => {
              this.partida = data;
              console.log(data);
            if(this.partida.estado != "-1") {
                this.game.pregunta_seleccionada = this.partida.estado; //establim pregunta
                this.router.navigateByUrl(`/admin/${this.id_partida}/game`);
            }
          }
          );
        })
  }
  iniciPartida(){
    this.firebase.changeState(this.ref_key,0);
  }

}
