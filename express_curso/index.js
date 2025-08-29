const express = require('express')

const app = express()

app.use(express.text())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/hello/:username', (req, res) => {
    console.log()
    if (typeof req.params.username === 'string') 
        res.send(`Hello ${req.params.username.toUpperCase()}`)
    else res.send('Esto no es un string')
})

app.get('/sume/:x/:y', (req, res) => {
    const {x, y} = req.params
    res.send(`Result: ${parseInt(x) + parseInt(y)}`)
})

app.get('/users/:username/photo', (req, res) => {
    console.log(req.params)
    if(req.params.username === 'edgardo') return res.send('Bienvenido Edgardo')

    res.send('El usuario no es valido...')
})

app.get('/query/:username', (req, res) => {
    console.log(req.query.user)
    console.log(req.query.age)

    res.send(`Hola ${req.params.username}`)
})

app.use((req, res, next) => {
    console.log('Paso por aqui')

    next() // es como un break para la funcion, esto viene de express
})

app.get('/search', (req, res) => {
    if (req.query.q === 'Hola mundo') return res.send('Lista de libros de JS')
    else res.send('Pagina normal')
})

app.listen(3000)
console.log(`Server on port ${3000}`)