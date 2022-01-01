import {Contenedor} from './Contenedor.js'

const products = new Contenedor("productos.txt")

console.log("Save return: " + await products.save({title: 'miprod_1', price: 24.5, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'}))
console.log("Save return: " + await products.save({title: 'miprod_2', price: 14.5, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'}))
console.log("Save return: " + await products.save({title: 'miprod_3', price: 12.5, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'}))
console.log("Save return: " + await products.save({title: 'miprod_4', price: 124.0, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'}))
console.log("Save return: " + await products.save({title: 'miprod_5', price: 24.2, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'}))
console.log(await products.getById(4))
await products.deleteById(1)
await products.deleteById(5)
await products.deleteById(3)
console.log(await products.getAll())

await products.deleteAll()
