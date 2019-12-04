export class Partida{
    nombre: string;
    preguntas: string;
    respuestas;
    usuarios;

    constructor(nombre,preguntas){
        this.nombre = nombre;
        this.preguntas = preguntas;
    }
}