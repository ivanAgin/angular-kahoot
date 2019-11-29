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

  public getPartides(){
    return this.firestore.collection('partidas').valueChanges();
  }
}
