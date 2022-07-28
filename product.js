const fs = require('fs');

class Product {
    constructor(path){
        this.path = path
    }

    async save(obj){
        let file = await fs.promises.readFile(this.path, 'utf8');
        let fileParse = JSON.parse(file);
        if(fileParse.length){
            let lastProdId = fileParse[fileParse.length - 1].id
            await fs.promises.writeFile(this.path, JSON.stringify([...fileParse, {...obj, id: lastProdId + 1}]), null, 2);
        }
        else {
            await fs.promises.writeFile(this.path, JSON.stringify([{...obj, id: 1}]), null, 2);
        }

        return fileParse.length + 1;
        console.log(file)
    }

    async getById(productId){
        try {
            let file = await fs.promises.readFile(this.path, 'utf8');
            let fileParse = JSON.parse(file);
            let prod = fileParse.find(p => p.id === productId);
            return prod ? prod : null;
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            let file = await fs.promises.readFile(this.path, 'utf8');
            let fileParse = JSON.parse(file);
            if(fileParse.length){
                return fileParse;
            }
            else {
                console.log("No hay productos");
            }
        } catch (error) {
            console.log(error);
        }
    }

    async delete(productId){
        try {
            let file = await fs.promises.readFile(this.path, 'utf8')
            let fileParse = JSON.parse(file);
            let prod = fileParse.find(p => p.id === productId);
            if(prod){
                let fileParseFiltered = fileParse.filter(p => p.id !== id);
                await fs.promises.writeFile(this.path, JSON.stringify(fileParseFiltered, null, 2))
                console.log("Producto eliminado")
            }
            else {
                console.log("No se encontro el producto");
            }
        } catch (error) {
            
        }
    }

    async deleteAll(){
        try {
            await fs.promises.writeFile(this.path, JSON.stringify([], null ,2), 'utf8')
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Product