import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, reduce } from 'rxjs/operators'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { RespuestaUsuario } from '../../models/respuesta.model';
import { v4 as uuid } from 'uuid';
import { AngularFireDatabase } from 'angularfire2/database';
import { Partida } from '../../models/partida.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private baseUrl = 'https://kahoot-angular.firebaseio.com/'

  constructor(private http: HttpClient,private realtime: AngularFireDatabase) {}

  public createPartida(codiPartida,nomPartida, setPreguntes){
    let partida = new Partida(codiPartida,nomPartida,setPreguntes)
    return this.realtime.list('/partidas').push(partida).then( (ref) => {
      return ref
    })
  }

  public getPartidaByCodi(codi){
    return Observable.create((observer) => {
      this.realtime.database.ref('/partidas').orderByChild('codi').equalTo(codi).on("value", (snapshot) => {
        snapshot.forEach(data => {
          observer.next(data.key)
          //k = data.key
        });
      })
    })
  }

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

  public setAnswer(codiPartida: string, respuesta: RespuestaUsuario){
    return this.realtime.list('/partidas/' + codiPartida + '/respuestas').push(respuesta).then(function (docRef){
      console.log("Document written with ID: ", docRef.key);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
  }

  public changePoints(codiPartida: string, usuario: string, point: number){
    console.log("HOLA?")
    //return this.realtime.list('/partidas/' + codiPartida + '/usuarios').update(usuario, { "nombre": usuario, "puntos": 1000 }).then(function (docRef) {
    return this.realtime.list('/partidas/' + codiPartida + '/usuarios/' + usuario).set('/puntos', point).then(function (docRef) {
      console.log("Updated!");
    })
    .catch(function (error) {
      console.error("Error updating document: ", error);
    });
  }

  public join(codiPartida: string, usuario: string){
    return this.realtime.list('/partidas/' + codiPartida + '/usuarios').push({"nombre": usuario ,"puntos" : 0}).then(function (docRef) {
      console.log("Updated!");
      return docRef.key;
    })
    .catch(function (error) {
      console.error("Error updating document: ", error);
      return null
    });
  }

  public unjoin(codiPartida: string, usuario: string) {
    const self = this;
    this.realtime.database.ref('/partidas/' + codiPartida + '/usuarios').orderByChild('nombre').equalTo(usuario).on("value", function(snapshot){
      snapshot.forEach(data => {
        self.realtime.list('/partidas/' + codiPartida + '/usuarios/' + data.key).remove()
        console.log(data.key)
      });
    })
  }

  public getWinners(codiPartida: string){
    this.realtime.database.ref('/partidas/' + codiPartida + '/usuarios').orderByChild('puntos').limitToLast(3).on("value",function(snapshot){
      snapshot.forEach(data => {
        console.log(data.key)
      })
    })
  }
}
