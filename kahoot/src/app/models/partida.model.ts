export class Partida{
    codi: string;
    nombre: string;
    preguntas: string;
    respuestas;
    usuarios;

    constructor(codi,nombre,preguntas){
        this.codi = codi;
        this.nombre = nombre;
        this.preguntas = preguntas;
    }
}