
const fs = require('fs')

const leerArchivo = async (fileName) => {

    try {
        
        const info = JSON.parse( await fs.promises.readFile(fileName, 'utf-8') ) 
        console.log(info)
        info.contenidoObj.author = "Coderhouse"
        await fs.promises.writeFile( 'package.json.coder', JSON.stringify(info.contenidoObj, null,2))

    } catch (error) {
        console.log(error)
    }
}

leerArchivo("info.txt")