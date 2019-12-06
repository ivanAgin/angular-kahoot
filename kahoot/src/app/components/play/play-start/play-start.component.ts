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

  private id: string;
  partida:Partida;

  constructor(private activatedRoute: ActivatedRoute,
              private firebase:FirebaseService,
              private router:Router ) { }

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.paramMap.get("id");

    this.firebase.getPartida(this.id).subscribe(
      data => {
        this.partida = data;
        if(this.partida.estado != "-1") {
          this.router.navigateByUrl(`/play/${this.id}/game`);
        }
      }
    );

  }

}
