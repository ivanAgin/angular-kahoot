export class RespuestaUsuario{
    pregunta    : string 
    respuesta   : string
    usuario     : string

    constructor(pregunta, respuesta, usuario){
        this.pregunta   = pregunta;
        this.respuesta  = respuesta;
        this.usuario    = usuario;
    }
}