import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-play-question',
  templateUrl: './play-question.component.html',
  styles: []
})
export class PlayQuestionComponent implements OnInit {

  haRespondido = false; //este flag es temporal para alternar en el html

  constructor() { }

  ngOnInit() {
  }

}
