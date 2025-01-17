const express = require('express')
const app = express()

const PORT = 8080
let counter = 0

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))

app.get('/', (req, res) => {
    res.send(`<h1 style="color:blue;">Bienvenidos al servidor express</h1>`)
})

app.get('/visitas', (req, res) => {
    addVisit()
    res.send(`<p>La cantidad de visitas es ${counter}</p>`)
})

app.get('/fyh', (req, res) => {
    res.send({fyh: new Date().toLocaleString()})
})


const addVisit = () => counter++