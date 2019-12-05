import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  codi_partida: number;

  constructor(private router:Router) { }

  ngOnInit() {
  }

  newGame() {
    this.router.navigateByUrl("/admin/start");
  }

}
