import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebaseService/firebase-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  codiPartida: string;
  join_button_text:string = "Join game";

  async joinGame(){
    this.join_button_text = "Joining...";
    const idFirebase:string = this.firebaseService.getPartidaByCodi(this.codiPartida);
    console.log(`joinGame(): idFirebase: ${idFirebase} - codiPartida: ${this.codiPartida} - navegant a /play/${idFirebase}`);
    if(idFirebase == "-1") {
      this.join_button_text = "Error";
      setTimeout(() => {
        this.join_button_text = "Join Game";
      }, 3000);
    }
    else {
      this.router.navigateByUrl(`/play/${idFirebase}`);
    }
  }


  constructor(private router: Router, private firebaseService: FirebaseService) { }

  ngOnInit() {
  }

  startNewGame() {
    this.router.navigateByUrl("/admin");
  }

}
