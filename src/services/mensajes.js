const moment = require("moment");
const mensajeModel = require("../dao/models/mensajes");
const { normalizeMessages, print } = require("../utils/normalizer");
const { v4: uuidv4 } = require("uuid");

module.exports = class {
  async createMensaje(mensaje) {
    mensaje["date"] = `[${moment().format("DD/MM/YYYY hh:mm:ss")}]`;
    mensaje["id"] = Date.now();

    const messageCreated = await mensajeModel.create(mensaje);
    return messageCreated;
  }
  
  async getAllMensajes() {
    const mensajes = await mensajeModel.find().lean();
    const messageCenter = this.messageCenterBuilder(mensajes);
    const normalizedMsgs = normalizeMessages(messageCenter);
    return normalizedMsgs;    
  }

  messageCenterBuilder = (mensajes) => {
    return { id: 1, content: mensajes };
  };
};