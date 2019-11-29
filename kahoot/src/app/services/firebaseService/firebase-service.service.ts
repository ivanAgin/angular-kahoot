import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private baseUrl = 'https://kahoot-angular.firebaseio.com/'

  constructor(private http: HttpClient,private firestore: AngularFirestore) {}

  public getSetPreguntas(){
    return this.firestore.collection('preguntas').snapshotChanges();

    /*return this.http.get(`${this.baseUrl}/preguntas.json`).pipe(map(res => {
      const data = res;
      console.log("HOLA " + data)
      return data;
    }));*/
  }
}
