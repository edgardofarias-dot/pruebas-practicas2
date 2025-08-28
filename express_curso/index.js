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

app.listen(3000)
console.log(`Server on port ${3000}`)