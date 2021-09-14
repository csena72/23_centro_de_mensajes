const  mensajeModel = require('../dao/models/mensajes');

module.exports = class {
    async createMensaje(mensaje){
        await mensajeModel.create(mensaje);
    }

    async getAllMensajes(){
        return mensajeModel.find();
    }
}