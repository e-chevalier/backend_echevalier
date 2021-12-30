import fs, { stat } from 'node:fs'

class Contenedor {

    constructor(fileName) {
        this.fileName = fileName
    }

    async getMaxid(){
        try {
            const stats = await fs.promises.stat(this.fileName)
            let res = 0

            if(stats.size){
                const productos = await this.getAll()
                // Initial values object with id:0 for empty array case.
                const max = productos.reduce((a,b) => a.id > b.id ? a:b, {id: 0} )
                res = max.id
                console.log(res)
            } else {
                console.log("getMaxId: ARCHIVO VACIO")
            }
            return res

        } catch (error) {
            console.log(error)
        }
    }

    async save( obj ) {

        try {
            const productos = await this.getAll()
            const max = await this.getMaxid()
            productos.push({...obj, id: max + 1})
            await fs.promises.writeFile(this.fileName, JSON.stringify(productos, null, 2))
            return max + 1
             
        } catch (error) {
            console.log("Error al realizar al appendFile en el método save: " + error)
        }
        
    }

    async getById( id ) {
        try {
            const stats = await fs.promises.stat(this.fileName)
            let res = null

            if(stats.size) {
                const productos = await this.getAll()
                const prod = productos.find( prod => prod.id === id)
                prod ? res = prod: res = null
            } else {
                console.log("getById: ARCHIVO VACIO")
            }
            return res
            
        } catch (error) {
            console.log(error)
        }
    }

    async getAll() {
        try {
            const stats = await fs.promises.stat(this.fileName)
            console.log("size :" + stats.size)

            if( stats.size ) {
                const content = JSON.parse( await fs.promises.readFile(this.fileName, 'utf-8'))
                return content
            } else {
                console.log("getAll: ARCHIVO VACIO")
            }

        } catch (error) {
            console.log(error)            
        }
    }

    async deleteById( id ) {

        try {
            const productos = await this.getAll()
            await fs.promises.writeFile(this.fileName, JSON.stringify(productos.filter( prod => prod.id !== id), null, 2))
                        
        } catch (error) {
            console.log(error)
        }

    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.fileName, JSON.stringify([], null, 2))            
        } catch (error) {
            console.log(error)
        }

    }


}

export { Contenedor }

//const productos = new Contenedor("productos.txt")
//productos.save({title: 'miprod_1', price: 124.5, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'})


