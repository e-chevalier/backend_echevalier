const fs = require('fs')
//import { writeFileSync, readFileSync } from 'fs'

try{
    let date = new Date().toLocaleString()
    fs.writeFileSync('./fyh.txt', date)
} catch ( error ) {
    console.error("Error al crear el archivo: " + error)
}

try{
    console.log(fs.readFileSync('./fyh.txt', 'utf-8'))
} catch ( error ){
    console.error("Error al leer el archivo: " + error)
} 