import express from 'express';
import { Contenedor } from './Contenedor.js'

const app = express()
const router = express.Router()

const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use('/api/productos', router)

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}
                 Open link to http://127.0.0.1:${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))

const contenedor = new Contenedor('productos.txt')
const productos = await contenedor.getAll()

app.get('/', (req, res) => {
    res.sendFile(__dirname + 'index.html')
})

router.get('/', (req, res) => {
    res.json(productos)
})

router.get('/:id', (req, res) => {
    let id = req.params.id
    let prod = productos.find(prod => prod.id == id)
    res.json(prod? prod: {error: 'Producto no encontrado.'} )
})

router.post('/', (req, res) => {
    let prod = req.body
    const max = productos.reduce((a,b) => a.id > b.id ? a:b, {id: 0} )
    prod.id = max.id + 1
    productos.push(prod)
    contenedor.save(prod) 
    res.json(prod)
})

router.put('/:id', (req, res) => {
    let prod = req.body
    let id = req.params.id
    let index = productos.findIndex(prod => prod.id == id)
    if ( index >= 0) {
        prod.id = id
        productos[index] = prod
        contenedor.updateById(id, prod)
    }
    res.json(index >= 0 ? {id: id}: {error: 'Producto no encontrado.'})
})


router.delete('/:id', (req, res) => {
    let id = req.params.id
    let index = productos.findIndex(prod => prod.id == id)
    if (index >= 0 ) { 
        productos.splice(index, 1)
        contenedor.deleteById(id)
    }
    res.json(index >= 0 ? {id: id}: {error: 'Producto no encontrado.'})
})




