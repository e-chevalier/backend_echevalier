import express from 'express'
import config from './config/index.js'
import cors from 'cors'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'





const PORT = config.port
//const argv = yargs(hideBin(process.argv)).argv
const argv = yargs(hideBin(process.argv))
    .default({
        modo: 'prod',
        puerto: 0,
        debug: false
    })
    .alias({
        m: 'modo',
        p: 'puerto',
        d: 'debug',
    })
    .boolean('debug')
    .argv


// node main.js 1 2 3 -m dev -p 8080 -d
//{ modo: 'dev', puerto: 8080, debug: true, otros: [ 1, 2, 3 ] }

console.log(argv)
console.log({ modo: argv.modo, puerto: argv.puerto, debug: argv.debug, otros: argv._ })

// const response = {modo: args.m ||'prod', puerto: args.p || 0, debug: args.d || false, otros: args._}
// console.log(response)

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
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