const express = require('express')
const {products} = require('./class/productMannager.js')

const app = express()
const port = 3000

app.use(express.urlencoded({ extended:true })) 

app.get('/products', async (req, res) => {
    const prod = await products.getProducts()

    const { limit = 0 } = req.query

    const queries = {
        limit
    }

    if (limit != 0) return res.send(prod.slice(0, queries.limit))

    return res.send({ prod })
})

app.get('/products/:pid', async (req, res) => {
    const pid = req.params.pid
    const prodId = await products.getProductsById(pid)
    res.send({ prodId })
})

app.listen(port, () => {
    console.log(`server running at port ${port}`)
})

