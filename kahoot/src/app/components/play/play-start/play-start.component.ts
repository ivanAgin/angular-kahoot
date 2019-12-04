import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-play-start',
  templateUrl: './play-start.component.html',
  styles: []
})
export class PlayStartComponent implements OnInit {


  users = ["martin", "joan", "ivan", "pol","alex","pancracio","jose"];

  private id: string;

  constructor(private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.paramMap.get("id");

  }

}
