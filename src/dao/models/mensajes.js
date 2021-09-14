const { Schema, model } = require('mongoose');

// Estructura del documento en MongoDB a través de Mongoose
const mensajeSchema = new Schema({
    mensaje: String,
    hora: String,
    email: String    
})

// Obj. de la clase que me da acceso a los métodos para hacer el CRUD.
module.exports = model('Mensaje', mensajeSchema);