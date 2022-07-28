const Product = require('./product.js')

const prod = new Product("./test.txt");

async function saveProducts (){
    await prod.save({title: 'produc1', price: 320, thumnail: 'url foto prod1'});
    await prod.save({title: 'produc2', price: 200, thumnail: 'url foto prod2'});
    await prod.save({title: 'produc3', price: 150, thumnail: 'url foto prod3'});
}

saveProducts();


async function getById() {
    const result = await prod.getById(2);
    console.log(result)
}

// (async () => {
//     console.log(await prod.getById(2))
// })()
getById();

async function deleteAll() {
    await prod.deleteAll();
}

//deleteAll();