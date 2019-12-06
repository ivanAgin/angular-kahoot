import { Respuesta } from './respuesta.model';
import { Usuario } from './usuario.model';

export class Partida{

    codi: string;
    estado: string; //-1 => start, -2 => finish, altres vol dir id pregunta
    nombre: string;
    preguntas: string;
    respuestas:Respuesta[];
    usuarios:Usuario[];

    constructor(codi,nombre,preguntas, estado){
        this.codi = codi;
        this.nombre = nombre;
        this.preguntas = preguntas;
        this.estado = estado;
    }
}