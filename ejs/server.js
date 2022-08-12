const express = require('express');

const app = express();
app.use( express.urlencoded({extended:true}))
const port = 4000 || process.env.PORT

app.set('view engine', 'ejs');
app.set('views', './ejs/views');

let productos = []

app.get('/', (req, res) => {
    res.render('index', {
        productos
    })
})

app.get('/cargarProducto', (req, res) => {
    res.render('pages/create', {
        mensaje: 'Hola ejs',
        productos
    })
})

app.post('/productos', (req, res) => {
    const obj = req.body
    productos.push(obj)
    res.render('pages/create', {
        // productos
    })
})

app.get('/productos', (req, res) => {
    res.render('pages/index', {
        productos
    })
})

app.listen(4000, err => {
    if(err) throw new Error(`Error on server: ${err}`)
    console.log(`Server is running on port ${port}`)
})