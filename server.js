//#region
// const express = require("express");
// const app = express();
// const { Router} = express
// const router = Router()
// const Product = require("./product");
// const prod = new Product("./products.txt");
// const PORT = 8080;

// app.use(express.urlencoded({extended:true}))
// app.use(express.json())
// app.use(express.static("public"))
// app.use("/api/products", router)
//#endregion

//#region
// app.get('/', (req, res) => {
//     res.send('Bienvenido al servidor Express')
// })

// let countVisitas = 0;
// app.get('/visitas', (req, res) => {
//     countVisitas++;
//     res.send(`La cantidad de visitas es: ${countVisitas}`)
// })

// app.get('/fyh', (req, res) => {
//     let date = new Date;
//     let dateFormat = [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/') + ' ' +
//                      [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');

//     res.send(`La fecha y hora actual es: ${dateFormat}`);
// })

// app.get('/productos', async (req, res) => {
//     const listProducts = await prod.getAll();
//     res.send(listProducts)
// })

// app.get('/productoRandom', async (req, res) => {
//     const listProducts = await prod.getAll();
//     const idProdAleatorio = Math.floor(Math.random() * listProducts.length);
//     const prodRandom = listProducts[idProdAleatorio];
//     res.send(prodRandom)
// })
//#endregion

//#region desafioApiRestful
// router.get("/", async (req,res)=>{
//     try {
//         const listProds = await prod.getAll()
//         res.json({
//             result: listProds   
//         })
//     } catch (error) {
//         res.json({
//             error
//         })
//     }
// })
// router.get("/:id", async (req, res) => {
//     try {
//         const { id } = req.params
//         const prodById = await prod.getById(Number(id))
//         res.json({
//             result: prodById
//         })

//     } catch (error) {
//         res.json({
//             error
//         })
//     }
// })

// router.post("/", async(req,res)=>{
//     try {
//         const {title,price,thumbnail} = req.body
//         const idProdSaved = await prod.save({title,price,thumbnail})
//         res.json({ result: {
//             title,
//             price,
//             thumbnail,
//             idProdSaved
//         }
//         })
        
//     } catch (error) {
//         res.json({
//             error
//         })
//     }
// })

// router.put("/:id", async(req,res)=>{
//     try {
//         const objProd = req.body
//         const {id} = req.params
//         const result = await prod.update({id: parseInt(id),...objProd})
//         res.json({
//             result: result
//         })
        
//     } catch (error) {
//         res.json({
//             error
//         })
//     }
// })

// router.delete("/:id", async (req, res) => {
//     try {
//         const { id } = req.params
//         const result = await prod.delete(Number(id))
//         res.json({
//             result: result
//         })
//     } catch (error) {
//         res.json({
//             error
//         })
//     }
// })

// app.listen(PORT, err =>{
//     try {
//         if(err) throw err
//         console.log(`listining port: ${PORT}`)

//     } catch (error) {
//         console.log(error)
//     }
// })

// const server = app.listen(PORT, () => {
//     console.log(`listining port: ${server.address().port}`)
// })

// server.on('error', (err) => console.log(err))
//#endregion

//#region handlebars
// const express = require('express');
// const handlebars = require('express-handlebars')

// const app = express();
// const port = 4000 || process.env.PORT
// //     fs.readFile(fieldpath, (err, archivo) => {
// //         if(err) {
// //             return callback(err);
// //         }

// //         const rendered = archivo.toString().replace('# title "', option.title).replace('# message #', option.message);

// //         return callback(null, rendered);
// //     })
// // });

// app.engine(
//     'hbs',
//     handlebars.engine({
//         extname: '.hbs',
//         defaultLayout: 'index.hbs',
//         layoutsDir: __dirname + '/views/layouts',
//         partialsDir: __dirname + '/views/partials'
//     })
// )

// app.set('view engine', 'hbs');
// app.set('views', './views');

// app.use(express.static('public'));

// const fakeApi = () => [
//     {name: 'Fede0', lane: 'midlaner'},
//     {name: 'Fede1', lane: 'midlaner'},
//     {name: 'Fede2', lane: 'midlaner'},
//     {name: 'Fede3', lane: 'midlaner'},
//     {name: 'Fede4', lane: 'midlaner'},
//     {name: 'Fede5', lane: 'midlaner'}
// ]

// app.get('/', (req, res) => {
//     res.render('main', { listExist: true, list: fakeApi() });
// })

// app.listen(4000, err => {
//     if(err) throw new Error(`Error on server: ${err}`)
//     console.log(`Server is running on port ${port}`)
// })
//#endregion

//#region pug
// const express = require('express');

// const app = express();
// const port = 4000 || process.env.PORT

// app.set('view engine', 'pug');
// app.set('views', './views');

// app.get('/datos', (req, res) => {
//     const { min, value, max, titulo } = req.query
//     res.render('index', {min, value, max, titulo})
// })

// app.listen(4000, err => {
//     if(err) throw new Error(`Error on server: ${err}`)
//     console.log(`Server is running on port ${port}`)
// })
//#endregion

//#region ejs
const express = require('express');

const app = express();
const port = 4000 || process.env.PORT

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('index', {
        mensaje: 'Hola ejs',
        productos: [
            {nombre: 'Producto1', precio: '100'},
            {nombre: 'Producto2', precio: '200'},
            {nombre: 'Producto3', precio: '300'}
        ]
    })
})

app.listen(4000, err => {
    if(err) throw new Error(`Error on server: ${err}`)
    console.log(`Server is running on port ${port}`)
})
//#endregion
