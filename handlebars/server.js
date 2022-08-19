const express = require("express")
const { Server: HttpServer } = require("http")
const { Server: IOServer } = require("socket.io")


const app = express()

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const Contenedor = require("./contenedor")
const contenedor = new Contenedor("./productos.txt")
const contenedorMensajes = new Contenedor("./mensajes.txt")
app.use(express.json())
const handlebars = require('express-handlebars')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 4000

app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        defaultLayout: '',
        layoutsDir: __dirname + '/views',
        partialsDir: __dirname + '/views/partials'
    })
)
app.set('view engine', 'hbs')
app.set('views', './views')

const productos = []
const arrayMensajes = []



io.on("connection", async (socket) => {
    const prods = await contenedor.getAll()
    
    const mensaje = {
        mensajee: "todo ok",
        prods,
        arrayMensajes,
    }
    socket.emit("mensaje-servidor", mensaje)
    socket.on("mensaje-nuevo", (mensajeChat) => {
       
        arrayMensajes.push(mensajeChat)
        contenedorMensajes.save(mensajeChat)

        io.sockets.emit("mensaje-servidor", mensaje)
    })

    socket.on("producto-nuevo", (productos) => {
        prods.push(productos)
        contenedor.save(productos)

    

        io.sockets.emit("mensaje-servidor", mensaje)
    })
})

app.get('/productos', async (req, res) => {
    try {
        const prods = await contenedor.getAll()
        productos.push(prods)
        res.render('productos', {
            mensaje: 'hola handle,Productos',
            productos: prods
        })
    } catch (error) {
        res.json({
            error
        })
    }

})
app.get('/', async (req, res) => {
    try {
        const prods = await contenedor.getAll()
        const mensajes = await contenedorMensajes.getAll()
        productos.push(prods)
        res.render('index', {
            mensaje: 'Hola handlebars',
            productos: prods,
            mensajes: mensajes
        })

    } catch (error) {
        res.json({
            error
        })
    }
})



app.post('/productos', async (req, res) => {
    try {
        const obj = req.body
        contenedor.save(obj)
        productos.push(obj)
        res.render('index', {
            productos: productos
        })
    } catch (error) {
        res.json({
            error
        })
    }

})


httpServer.listen(port, err => {
    if (err) throw new Error(`error on server listen${err}`)
    else {
        console.log(`server on running on port ${port}`)
    }
})