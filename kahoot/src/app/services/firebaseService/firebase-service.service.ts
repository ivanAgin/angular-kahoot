import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, reduce } from 'rxjs/operators'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Respuesta } from '../models/respuesta.model';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private baseUrl = 'https://kahoot-angular.firebaseio.com/'

  constructor(private http: HttpClient,private firestore: AngularFirestore) {}

  public createPartida(nomPartida, setPreguntes, users){
    let partida = this.firestore.collection('partidas').add({
      "nombre": nomPartida,
      "preguntas": setPreguntes,
      "puntuaciones": {
        "usuario1": "Ivan",
        "usuario2": "Pol",
      }
    }).then( p => {
      users.forEach( u => {
        console.log(p.id)
        // Usuaris
        p.collection('usuarios').add({
          "nombre": u
        })
        //Puntuacio
        p.collection('puntuacion').doc(u).set({
          "puntos": "0"
        })
      })


    })
  }

  public getPartides(){
    return this.firestore.collection('partidas').valueChanges();
  }

  public getPartida(codi: string){
    return this.firestore.collection('partidas').doc(codi).valueChanges();
  }

  public getRespuestasDePartida(codiPartida: string) {
    return this.firestore.collection('partidas').doc(codiPartida).collection('respuestas').valueChanges();
  }

  public setAnswer(codiPartida: string, respuesta: Respuesta){
    return this.firestore.collection('partidas').doc(codiPartida).collection('respuestas').add(JSON.parse(JSON.stringify(respuesta))).then(function (docRef){
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
  }

  public changePoints(codiPartida: string, usuario: string, point: string){
    return this.firestore.collection('partidas').doc(codiPartida).collection('puntuaciones').doc(usuario).update({"puntos": point}).then(function (docRef) {
      console.log("Updated!");
    })
    .catch(function (error) {
      console.error("Error updating document: ", error);
    });
  }

  public join(codiPartida: string, usuario: string){
    return this.firestore.collection('partidas').doc(codiPartida).collection('usuarios').add({"nombre": usuario}).then(function (docRef) {
      console.log("Updated!");
    })
    .catch(function (error) {
      console.error("Error updating document: ", error);
    });
  }

  public unjoin(codiPartida: string, usuario: string) {
    this.firestore.collection('partidas').doc(codiPartida).collection('usuarios', ref => ref.where("nombre", "==", usuario)).get().subscribe(
      data => {
        let userId = data.forEach(function (user) {
          user.ref.delete();
        })
      }
    );  
  }
}
