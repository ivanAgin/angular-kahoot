import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebaseService/firebase-service.service';

@Component({
  selector: 'app-prova',
  templateUrl: './prova.component.html',
  styleUrls: ['./prova.component.css']
})
export class ProvaComponent implements OnInit {

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.firebaseService.getPartides().subscribe( data => {
      console.log(data)
    })
  }

}
