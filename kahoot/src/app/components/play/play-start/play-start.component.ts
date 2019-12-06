import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebaseService/firebase-service.service';
import { Partida } from 'src/app/models/partida.model';

@Component({
  selector: 'app-play-start',
  templateUrl: './play-start.component.html',
  styles: []
})
export class PlayStartComponent implements OnInit {

  users = ["martin", "joan", "ivan", "pol","alex","pancracio","jose"];

  private id_partida: string;
  partida:Partida;
  participating:boolean = false;
  button_text:string = "Join Game";
  alias:string = "";

  constructor(private activatedRoute: ActivatedRoute,
              private firebase:FirebaseService,
              private router:Router ) { }

  ngOnInit() {

    this.id_partida = this.activatedRoute.snapshot.paramMap.get("id");

    this.firebase.getPartida(this.id_partida).subscribe(
      data => {
        this.partida = data;
        if(this.partida.estado != "-1") {
          this.router.navigateByUrl(`/play/${this.id_partida}/game`);
        }
      }
    );

  }

  join() {
    this.button_text = "Joining...";
    this.participating = true;
    this.firebase.join(this.id_partida, this.alias).then((docRef) => {
        this.button_text = "Waiting to start...";
        //docRef.key;
      })
      .catch(function (error) {
        this.button_text = "Error";
        this.participating = false;
        //null
      });
  }

}
