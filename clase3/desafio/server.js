import express from 'express';
const app = express()
import {Contenedor} from './Contenedor.js'


const PORT = 8080

let productos = await (new Contenedor('./productos.txt').getAll())
console.log(productos)
console.log(productos[1])

const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}


const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))

app.get('/', (req, res) => {
    res.send(`<h1>Bienvenido al desafio de la clase 3.</h1>`)
})

app.get('/productos', (req, res) => {
    res.send(productos)
})

app.get('/productoRandom', (req, res) => {
    let idRandom = getRandomIntInclusive(0,2)
    console.log("idRandom : " + idRandom);
    res.send(productos[idRandom])
})
