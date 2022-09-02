// server

const express=require ('express')
const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')
const { Router } = express;

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

app.use(express.static('public'))
const dotenv = require ('dotenv').config()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const routerProductos = Router();

const {options}=require('./Db/mariaDB/conexionDB')
const {optionsSQ}=require('./Db/sqlite3/conexionDB')

const KnexMDB= require('knex')(options)
const KnexSqLite= require('knex')(optionsSQ)

// archivo productos
const Contenedor=require('./Api/Contenedor.js')
const productos = new Contenedor(KnexMDB,'productos');

// archivo comentarios
const Comentarios= require('./Api/ComentariosArray')
const mensajes = new Comentarios(KnexSqLite, 'mensajes');

app.get('/',(req,res)=>{
    res.render('/index.html',{root: __dirname})
})



io.on('connection', (socket)=>{
    console.log('usuario conectado')
    
    // cargar 
    const listaProductos = async () => {
        let prods = await productos.getAll()
        io.sockets.emit('lista-productos', prods)
    }

    const listaMensajes =  () => {
        let msj =  mensajes.getAllComments
        console.log(msj)
        io.sockets.emit('lista-mensajes', msj)
    }



    socket.on('connection',async data=>{
        await listaProductos()
        await listaMensajes()

    })

    socket.on('producto-nuevo', async data => {
        console.log('producto nuevo')
        await productos.save(data)
        await listaProductos()
    })
    
    socket.on('mensaje-nuevo', async data => {
        console.log('mensaje nuevo')
        await mensajes.save(data)
        await listaMensajes()
    })
    
})

app.use("/api/productos", routerProductos);

// config puerto
const PORT = process.env.PORT

httpServer.listen(PORT,()=>{
    console.log(`Escuchando en puerto ${PORT}`)
})