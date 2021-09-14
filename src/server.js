const express = require("express");
var exphbs = require('express-handlebars');
const routes = require("./routes/routes");
const compression = require("compression");
const cors = require("cors");

const router = express.Router();
const app = express();

const http = require('http'); 
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server);
const path = require('path')

app.use(express.urlencoded({extended: true}));

app.use(express.json());
app.use(cors());
app.use(compression());

app.use(routes(router));

app.engine('handlebars', exphbs());

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, './views'));


app.use(express.static(path.join(__dirname, 'public')));


io.on('connection', async (socket) => {
  const ProductoService = require("./services/producto");
  const MensajeService = require("./services/mensajes");
  productoService = new ProductoService();
  mensajeService = new MensajeService();

  let productosWs = await productoService.getAllProductos();
  let mensajes = await mensajeService.getAllMensajes();

  console.log(productosWs);

  console.log("new connection", socket.id);

  socket.emit('mensajes', { mensajes: await mensajeService.getAllMensajes() })

  socket.on('nuevo-mensaje', (nuevoMensaje) => {    
    let elNuevoMensaje = {
      mensaje: nuevoMensaje.mensaje,
      hora: nuevoMensaje.hora,
      email: nuevoMensaje.email
    }
    mensajeService.createMensaje(elNuevoMensaje);

    io.sockets.emit('recibir nuevoMensaje', [elNuevoMensaje])
  })

  io.sockets.emit('productosWs', await productoService.getAllProductos() );

  socket.on('producto-nuevo', data => {
    //productosWs.push(data);
  })

});

module.exports = app;