
const express = require('express')
const app = express()
const { Router} = express
const router = Router()
const Contenedor = require("./contenedor")
const contenedor = new Contenedor("./productos.txt")
app.use(express.json())
app.use(express.static("public"))

app.use( express.urlencoded({extended: true}) )

const port = process.env.PORT || 4000

app.set('view engine', 'pug')
app.set('views', './views')
app.use("/api", router)
const productos = []

//configurar get 
router.get('/productos', async(req, res) => {
    try {
        const productos1 = await contenedor.getAll()
        productos.push(productos1)
          res.render('pages/productos',{
              mensaje: 'Hola ejs',
              productos:productos1
          })
        } catch (error) {
            res.json({
                error
            })
        }

} )
router.get('/', async(req, res) => {
    try {
        const productos1 = await contenedor.getAll()
      productos.push(productos1)
        res.render('pages/index',{
            mensaje: 'Hola ejs',
            productos:productos1
        })
        
    } catch (error) {
        res.json({
            error
        })
    }
} )



router.post('/productos', async (req, res) => {
    try {
        const obj = req.body
        contenedor.save(obj)
    
        console.log(obj)
        
        productos.push(obj)
        res.render('pages/index',{
            mensaje: 'Hola ejs',
            productos:productos
        })
        
    } catch (error) {
        res.json({
            error
        })
    }

})



app.set("view engine","pug")
app.set("views","./views")

// app.get("/",(req,res)=>{
//     res.render("index.pug",{mensaje:"hola pugGGObjeto"})
// })














app.listen(port, err =>{
if(err) throw new Error (`error on server listen${err}`)
else{
    console.log(`server on running on port ${port}`)
}
})