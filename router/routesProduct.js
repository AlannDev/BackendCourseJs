const express = require('express')
const { Router } = express

const router = Router()
const Product = require('../api/Product')
const dbProds = new Product('./db/products.json')

const admin = true

router.get('/', async (req, res) => {
    const prods = await dbProds.getAllProducts()
    res.send({
        result: prods
    })
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const product = await dbProds.getById(parseInt(id))

    res.send({
        result: product
    })

})

router.post('/', async (req, res) => {

    const product = req.body
    result = await dbProds.save(product)
    console.log(result)

    res.json({
        result: result
    })
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const product = req.body

    const result = await dbProds.updateById({ ...product, id: parseInt(id) })
    res.json({ result: result })

})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    const result = await dbProds.delete(Number(id))

    res.json({
        result: result
    })
})

module.exports = router