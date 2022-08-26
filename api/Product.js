const fs = require('fs');

class Product {
    constructor(path) {
        this.path = path
    }

    async save(product) {

        const timestamp = new Date().getTime()
        let productId = -1

        try {
            let data = await fs.promises.readFile(this.path, 'utf8')
            let dataParse = JSON.parse(data)

            if (dataParse.length) {
                await fs.promises.writeFile(this.path, JSON.stringify([
                    ...dataParse, 
                    { ...product, timestamp: timestamp, id: dataParse[dataParse.length - 1].id + 1 }
                ], null, 2))

                console.log(`productId: ${dataParse[dataParse.length - 1].id + 1}`)
                return { message: 'producto insertado', producto: { ...product, timestamp: timestamp, id: dataParse[dataParse.length - 1].id + 1 }}


            } else {
                await fs.promises.writeFile(this.path, JSON.stringify([{ ...product, id: 1, timestamp: timestamp }], null, 2))
                console.log(`productId: ${1}`)
                return { message: 'producto insertado', producto: { ...product, timestamp: timestamp, id: 1 }}
            }


        } catch (error) {
            console.log(error)
            return { message: error }
        }
    }

    async updateById(product) {
        try {
            let data = await fs.promises.readFile(this.path, 'utf8')
            let dataParse = JSON.parse(data)
            const objIndex = dataParse.findIndex(prod => prod.id === product.id)


            if (objIndex !== -1) {
                product.timestamp = new Date().getTime()
                dataParse[objIndex] = product
                await fs.promises.writeFile(this.path, JSON.stringify(dataParse, null, 2))

                console.log('archivo actualizado')
                return { message: 'producto actualizado', producto: product }

            } else {
                return { message: 'No existe el producto' }
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getById(id) {
        try {
            let data = await fs.promises.readFile(this.path, 'utf8')
            let dataParse = JSON.parse(data)
            let product = dataParse.find(productoId => productoId.id === id)

            if (product) {
                console.log({ producto: product })
                return ({ producto: product })

            } else {
                return { message: 'No existe el producto' }
            }


        } catch (error) {
            console.log(error)
            return { message: error }
        }
    }

    async getAllProducts() {
        try {
            let data = await fs.promises.readFile(this.path, 'utf8')
            let prods = JSON.parse(data)

            if (prods.length) {
                console.log(prods)
                return ({ productos: prods})
            } else {
                console.log(`no hay productos`)
                return { message: 'No hay productos' }
            }

        } catch (error) {
            console.log(error)
            return { message: error }
        }
    }

    async delete(id) {

        try {
            let data = await fs.promises.readFile(this.path, 'utf8')
            let dataParse = JSON.parse(data)

            let product = dataParse.find(productoId => productoId.id === id)

            if (product) {
                let dataFiltrado = dataParse.filter(productoId => productoId.id !== id)
                await fs.promises.writeFile(this.path, JSON.stringify(dataFiltrado, null, 2))
                console.log(`Producto ${id} eliminado`)
                return { message: 'Producto eliminado', producto: product }

            } else {
                console.log("No existe el producto")
                return { message: 'No existe el producto' }
            }

        } catch (error) {
            console.log(error)
            return { message: error }
        }
    }

    async deleteAll() {

        await fs.promises.writeFile(this.path, JSON.stringify([], null, 2))

    }
}

module.exports = Product;