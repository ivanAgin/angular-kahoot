import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, reduce } from 'rxjs/operators'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Respuesta } from '../models/respuesta.model';
import { v4 as uuid } from 'uuid';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private baseUrl = 'https://kahoot-angular.firebaseio.com/'

  constructor(private http: HttpClient,private realtime: AngularFireDatabase) {}
/*
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
        p.collection('usuarios').doc(u).set({
          "usuario": u,
          "puntos": 0
        })
      })


    })
  }*/

  public getPartides(){
    return this.realtime.list('/partidas').valueChanges();
    //return this.firestore.collection('partidas').valueChanges();
  }

  public getPartida(codi: string){
    return this.realtime.list('/partidas/'+codi).valueChanges();
  }
  
  public getRespuestasDePartida(codiPartida: string) {
    return this.realtime.list('/partidas/' + codiPartida + '/respuestas').valueChanges();
  }

  public setAnswer(codiPartida: string, respuesta: Respuesta){
    return this.realtime.list('/partidas/' + codiPartida + '/respuestas').push(respuesta).then(function (docRef){
      console.log("Document written with ID: ", docRef.key);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
  }

  public changePoints(codiPartida: string, usuario: string, point: number){
    this.realtime
    return this.realtime.list('/partidas/' + codiPartida).update('puntuacion',{usuario: point}).then(function (docRef) {
      console.log("Updated!");
    })
    .catch(function (error) {
      console.error("Error updating document: ", error);
    });
  }

  public join(codiPartida: string, usuario: string){
    return this.realtime.list('/partidas/' + codiPartida + '/usuarios').push({"nombre": usuario }).then(function (docRef) {
      console.log("Updated!");
    })
    .catch(function (error) {
      console.error("Error updating document: ", error);
    });
  }

  /*public unjoin(codiPartida: string, usuario: string) {
    //this.realtime.database.ref('/partidas/' + codiPartida + '/usuarios').orderByChild('nombre').equalTo(usuario).
    let usuarios = this.realtime.list('/partidas/' + codiPartida + '/usuarios').valueChanges().subscribe((usuarios) => {
      usuarios.forEach(u => {
        if(u['nombre']==usuario){
          console.log(u.);
        }
      });
    })

    /*this.firestore.collection('partidas').doc(codiPartida).collection('usuarios', ref => ref.where("nombre", "==", usuario)).get().subscribe(
      data => {
        data.forEach(function (user) {
          user.ref.delete();
        })
      }
    );  
  }*/

  /*public getWinners(codiPartida: string){
    return this.firestore.collection('partidas').doc(codiPartida).collection('usuarios', ref => ref.orderBy("puntos","desc").limit(3)).valueChanges();
  }*/
}
