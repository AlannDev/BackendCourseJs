const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const PORT = process.env.PORT

const routerProd = require('./router/routesProduct')
const routerCart = require('./router/routesCart')

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

app.use('/api/productos', routerProd)
app.use('/api/carrito', routerCart)

app.listen(PORT, () => {
    console.log(`Escuchando en puerto ${PORT}`)
})