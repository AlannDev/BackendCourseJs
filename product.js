const fs = require('fs');

class Product {
    constructor(path){
        this.path = path
    }

    async save(obj) {
        try {
            let file = await fs.promises.readFile(this.path, 'utf8');
            let fileParse = JSON.parse(file);
            if (fileParse.length) {
                let lastProdId = fileParse[fileParse.length - 1].id
                await fs.promises.writeFile(this.path, JSON.stringify([...fileParse, { ...obj, id: lastProdId + 1 }]), null, 2);
            }
            else {
                await fs.promises.writeFile(this.path, JSON.stringify([{ ...obj, id: 1 }]), null, 2);
            }

            return fileParse.length + 1;
        } catch (error) {
            throw error
        }
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
                return ({message: "Producto eliminado"})
            }
            else {
                throw "No se encontro el producto";
            }
        } catch (error) {
            throw error
        }
    }

    async deleteAll(){
        try {
            await fs.promises.writeFile(this.path, JSON.stringify([], null ,2), 'utf8')
        } catch (error) {
            console.log(error);
        }
    }

    async update(obj){
        try {
            console.log(this.path)
            let file = await fs.promises.readFile(this.path, "utf-8")
            console.log(file)
            let fileParse = JSON.parse(file)
            console.log(obj.id)
            console.log(fileParse)
            const objIndex = fileParse.findIndex(prod => prod.id === obj.id)
            console.log(objIndex)
            if(objIndex !== -1){
                fileParse[objIndex] = obj
                await fs.promises.writeFile(this.path,JSON.stringify(fileParse,null,2))
                return {message:"producto actualizado"}
            }else{
                throw "No existe el producto"
            }
        } catch (error) {
            throw error
        }
    }
}

module.exports = Product