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

  joinGame(idPartida: string): void{
    this.router.navigateByUrl(`/play/${idPartida}`);
  }

  getIdPartida(): void {
    var idFirebase = this.firebaseService.getPartidaByCodi(this.codiPartida);
    this.joinGame(idFirebase);
  }

  constructor(private router: Router, private firebaseService: FirebaseService) { }

  ngOnInit() {
  }

}
