
const express = require('express')
const app = express()
const { Router} = express
const router = Router()
const Contenedor = require("./contenedor")
const contenedor = new Contenedor("./productos.txt")
app.use(express.json())
const handlebars = require('express-handlebars')
app.use(express.static('public'))
app.use( express.urlencoded({extended: true}) )

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

//configurar get 
app.get('/productos', async(req, res) => {
    try {
        const productos1 = await contenedor.getAll()
        productos.push(productos1)
          res.render('productos',{
              mensaje: 'Hola ejs',
              productos:productos1
          })
        } catch (error) {
            res.json({
                error
            })
        }

} )
app.get('/', async(req, res) => {
    try {
        const productos1 = await contenedor.getAll()
      productos.push(productos1)
        res.render('index',{
            mensaje: 'Hola ejs',
            productos:productos1
        })
        
    } catch (error) {
        res.json({
            error
        })
    }
} )



app.post('/productos', async (req, res) => {
    try {
        const obj = req.body
        contenedor.save(obj)
    
        console.log(obj)
        
        productos.push(obj)
        res.render('index',{
            mensaje: 'Hola ejs',
            productos:productos
        })
        
    } catch (error) {
        res.json({
            error
        })
    }

})




app.listen(port, err =>{
if(err) throw new Error (`error on server listen${err}`)
else{
    console.log(`server on running on port ${port}`)
}
})