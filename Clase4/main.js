const Product = require('./product.js')

const prod = new Product("./test.txt");

prod.save({title: 'produc1', price: 320, thumnail: 'url foto prod1'});
prod.save({title: 'produc2', price: 200, thumnail: 'url foto prod2'});
prod.save({title: 'produc3', price: 150, thumnail: 'url foto prod3'});

prod.getById(2);

prod.getAll();

prod.delete(1);

prod.deleteAll();