import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  codiPartida: string;

  joinGame(): void{
    this.router.navigateByUrl(`/play/${this.codiPartida}`);
  }

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
