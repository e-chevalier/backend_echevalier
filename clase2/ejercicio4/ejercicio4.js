const fs = require('fs')

const leerArchivo = () => {

    fs.readFile('./package.json', (err, data) => {
        if (err) throw err;
        const info = {
            contenidoStr: JSON.stringify(data),
            contenidoObj: JSON.parse(data),
            size: fs.statSync('./package.json').size
        }
        console.log(info)
        fs.writeFile('./info.txt', JSON.stringify(info, null, 2),(err) => {
            if (err) throw err;
            console.log("Archivo guardado con exito.")
        })
    })
}


leerArchivo()