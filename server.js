const express = require("express");
const Product = require("./product");
const prod = new Product("./products.txt");
const app = express();
const PORT = 8080;

app.get('/', (req, res) => {
    res.send('Bienvenido al servidor Express')
})

let countVisitas = 0;
app.get('/visitas', (req, res) => {
    countVisitas++;
    res.send(`La cantidad de visitas es: ${countVisitas}`)
})

app.get('/fyh', (req, res) => {
    let date = new Date;
    let dateFormat = [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/') + ' ' +
                     [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');

    res.send(`La fecha y hora actual es: ${dateFormat}`);
})

app.get('/productos', async (req, res) => {
    const listProducts = await prod.getAll();
    res.send(listProducts)
})

app.get('/productoRandom', async (req, res) => {
    const listProducts = await prod.getAll();
    const idProdAleatorio = Math.floor(Math.random() * listProducts.length);
    const prodRandom = listProducts[idProdAleatorio];
    res.send(prodRandom)
})

const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${server.address().port}`)
})

server.on('error', (err) => console.log(err))