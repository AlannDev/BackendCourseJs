const fs = require('fs');

class Cart {
    constructor(path) {
        this.path = path
    }

    async save(cart) {
        const timestamp = new Date().getTime()
        try {
            let data = await fs.promises.readFile(this.path, 'utf8')
            let dataParse = JSON.parse(data)

            if (dataParse.length) {
                await fs.promises.writeFile(this.path, JSON.stringify([
                    ...dataParse,
                    { ...cart, timestamp: timestamp, id: dataParse[dataParse.length - 1].id + 1 }
                ], null, 2))
                console.log(`carritoId: ${dataParse.length + 1}`)
                return { message: 'carrito creado', carrito: { ...cart, timestamp: timestamp, id: dataParse[dataParse.length - 1].id + 1 } }
            } else {
                await fs.promises.writeFile(this.path, JSON.stringify([{ ...cart, timestamp: timestamp, id: 1 }], null, 2))
                console.log(`carritoId: ${1}`)
                return { message: 'carrito creado', carrito: { ...cart, timestamp: timestamp, id: 1 } }
            }
        } catch (error) {
            console.log(error)
            return { message: error }
        }
    }

    async addToCart(id, prods) {
        try {
            let data = await fs.promises.readFile(this.path, 'utf8')
            let dataParse = JSON.parse(data)

            let cartToUpdate = dataParse.find(c => c.id === id)

            if (cartToUpdate) {
                prods.productos.map(prod => {
                    cartToUpdate.productos.push(prod)
                })

                let dataUpdated = dataParse.map(cart => {
                    if(cart.id === cartToUpdate.id){
                        return cartToUpdate 
                    }
                    return cart
                })

                console.log(cartToUpdate.productos)

                await fs.promises.writeFile(this.path, JSON.stringify(dataUpdated, null, 2))
                console.log(`Carrito ${id} actualizado`)
                return { message: 'productos en carrito actulizados', carrito: cartToUpdate }

            } else {
                console.log("El carrito no existe")
                return { message: 'El carrito no existe' }
            }
        } catch (error) {
            console.log(error)
            return { message: error }
        }
    }

    async getById(id) {

        try {
            let data = await fs.promises.readFile(this.path, 'utf-8')
            let dataParse = JSON.parse(data)
            let cart = dataParse.find(c => c.id === id)

            if (cart) {
                console.log({ carritoId: cart })
                return { message: 'ok', productos: cart.productos }

            } else {
                console.log("No se encontro el carrito por id")
                return { message: 'no existe el carrito' }
            }


        } catch (error) {
            console.log(error)
            return { message: error }
        }
    }

    async getAllCarritos() {
        try {
            let data = await fs.promises.readFile(this.path, 'utf-8')
            let dataParse = JSON.parse(data)

            if (dataParse.length) {
                console.log(dataParse)
                return (dataParse)
            } else {
                console.log(`no hay carritos guardados`)
            }

        } catch (error) {
            console.log(error)
        }

    }

    async delete(id) {

        try {
            let data = await fs.promises.readFile(this.path, 'utf8')
            let dataParse = JSON.parse(data)

            let cart = dataParse.find(c => c.id === id)

            if (cart) {
                let dataFiltered = dataParse.filter(c => c.id !== id)
                await fs.promises.writeFile(this.path, JSON.stringify(dataFiltered, null, 2))
                console.log(`Carrito ${id} eliminado`)
                return { message: 'carrito eliminado', carrito: cart }

            } else {
                console.log("El carrito no existe")
                return { message: 'El carrito no existe' }
            }

        } catch (error) {
            console.log(error)
            return { message: error }
        }
    }

    async deleteProdOnCart(cartId, prodId) {

        try {
            let data = await fs.promises.readFile(this.path, 'utf8')
            let dataParse = JSON.parse(data)

            let cartToUpdate = dataParse.find(c => c.id === cartId)

            if (cartToUpdate) {

                let prodsFiltered = cartToUpdate.productos.filter(p => p.id !== prodId)

                cartToUpdate.productos = prodsFiltered

                let dataUpdated = dataParse.map(cart => {
                    if(cart.id === cartToUpdate.id){
                        return cartToUpdate 
                    }
                    return cart
                })

                await fs.promises.writeFile(this.path, JSON.stringify(dataUpdated, null, 2))
                console.log(`Carrito ${cartId} actualizado`)
                return { message: 'producto eliminado del carrito', carrito: cartToUpdate }

            } else {
                console.log("El carrito no existe")
                return { message: 'El carrito no existe' }
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

module.exports = Cart;