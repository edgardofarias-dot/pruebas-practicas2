const express = require('express')
const morgan = require('morgan')

const app = express()
const PORT = 3000
let products = [ 
    {
        id: 1,
        name: "Laptop",
        price: 3000
    }
 ]

app.use(morgan('dev'))
app.use(express.json())

app.listen(PORT)
console.log(`server on port ${PORT}`)


app.get('/products', (req, res) => {
    res.json(products)
})

app.post('/products', (req, res) => {
    const newProduct = ({id: products.length+1, ...req.body})
    products.push(newProduct)
    res.send(newProduct)
})

app.put('/products/:id', (req, res) => {

    const newData = req.body // {price : 3000} o {name : "asdfasdf", price : 3000}
    const productFound = products.find((product) => 
        product.id === parseInt(req.params.id)
    )

    if (!productFound)
        return res.status(404).send('Product not found')

    products = products.map(p => p.id === parseInt(req.params.id) ? {...p, ...newData} : p)

    res.send('Product updated successfully')
})

app.delete('/products/:id', (req, res) => {
    const productFound = products.find((product) => 
        product.id === parseInt(req.params.id)
    )

    if (!productFound)
        return res.status(404).send('Product not found')

    products = products.filter(p => p.id !== parseInt(req.params.id))

    res.sendStatus(204)
})

app.get('/products/:id', (req, res) => {
    const productFound = products.find((product) => 
        product.id === parseInt(req.params.id)
    )

    if (!productFound) return res.status(404).send('Products not found')

    res.json(productFound)
})