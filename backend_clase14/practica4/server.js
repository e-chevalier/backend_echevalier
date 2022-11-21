import express from 'express'
import config from './config/index.js'
import cors from 'cors'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const PORT = config.port

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors("*"))


const server = app.listen(PORT, (err) => {
    if (err) {
        console.log("Error while starting server")
    } else {
        console.log(`Servidor http escuchando en el puerto ${server.address().port}
                 Open link to http://127.0.0.1:${server.address().port}`)
    }
})


server.on('error', error => console.log(`Error en servidor ${error}`))


const argv = yargs(hideBin(process.argv)).argv


// node main.js 1 2 3 -m dev -p 8080 -d
//{ modo: 'dev', puerto: 8080, debug: true, otros: [ 1, 2, 3 ] }



//console.log(argv)

const numbers = argv._ // equivalente a un let numeros: process.argv.slice(2)
const l = numbers.length

//console.log(process.argv.slice(2))

let response = {}

process.on('exit', (code) => {
    console.log(response)
    console.log('Salida con error: ' + code)
})


if (l > 0) {

    if (numbers.every((e) => typeof e == "number")) {
        response = {
            datos: {
                numeros: numbers,
                promedio: l ? numbers.reduce((a, b) => a + b / l, 0) : 0,
                max: numbers.reduce((a, b) => b < a ? a : b, 0),
                min: numbers.reduce((a, b) => b > a ? a : b, numbers[0]),
                ejecutable: argv.$0, // process.argv[1]
                pid: process.pid
            }
        }
        process.exit()
    } else {
        response = {
            error: {
                descripcion: 'error de tipo',
                numeros: numbers,
                tipos: numbers.map(e => typeof e)
            }
        }
        process.exit('-5')
    }
} else {
    response = {
        error: {
            descripcion : 'Entrada vacia'
        }
    }
    process.exit('-4')
}





