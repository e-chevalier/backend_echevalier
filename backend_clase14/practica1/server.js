import express from 'express'
import config from './config/index.js'
import cors from 'cors'
import parseArgs from 'minimist'


const PORT = config.port
const args = parseArgs(process.argv.slice(2))

// node main.js 1 2 3 -m dev -p 8080 -d
//{ modo: 'dev', puerto: 8080, debug: true, otros: [ 1, 2, 3 ] }

console.log(args)

const response = {modo: args.m ||'prod', puerto: args.p || 0, debug: args.d || false, otros: args._}
console.log(response)

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