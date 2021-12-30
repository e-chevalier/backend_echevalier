import {Contenedor} from './Contenedor.js'

const products = new Contenedor("productos.txt")


//console.log("LLAMADA A getByID(1)")
//products.getById(1)

//products.getAll()

await products.getMaxid()
await products.save({title: 'miprod_5', price: 124.5, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'})
await products.deleteById(6)
await products.deleteAll()
