const express = require('express')
const { Router } = express

const router = Router()
const Cart = require("../api/Cart.js")
const dbCart = new Cart('./db/carts.json')


//productos guardados en un carrito
router.get('/:id/productos', async (req, res) => {
    const { id } = req.params
    const prods = await dbCart.getById(parseInt(id))
    res.json({
        result: prods
    })
})

//agregar productos a un carrito
router.post('/:id/productos', async (req, res) => {
    const { id } = req.params;
    const prods = req.body
    const result = await dbCart.addToCart(parseInt(id), prods)
    res.json({
        result: result
    })
})

router.post('/', async (req, res) => {
    const cartProds = req.body
    result = await dbCart.save(cartProds)
    res.json({
        result: result
    })
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    const result = await dbCart.delete(parseInt(id))
    res.json({
        result: result
    })
})

router.delete('/:id/productos/:id_prod', async (req, res) => {
    const { id } = req.params
    const { id_prod } = req.params
    const result = await dbCart.deleteProdOnCart(parseInt(id), parseInt(id_prod))
    res.json({
        result: result
    })
})

module.exports = router