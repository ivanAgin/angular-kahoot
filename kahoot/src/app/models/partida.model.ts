import { Respuesta } from './respuesta.model';
import { Usuario } from './usuario.model';

export class Partida{
    codi: string;
    nombre: string;
    preguntas: string;
    estado: string
    respuestas: Respuesta[] = [];
    usuarios: Usuario[] = [];

    constructor(codi,nombre,preguntas){
        this.codi = codi;
        this.nombre = nombre;
        this.preguntas = preguntas;
        this.estado = "-1"; //-1 pregame, -2 finish
    }
}