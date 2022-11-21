import express from 'express';
const app = express()
const router = express.Router()

const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/personas', router)
app.use('/mascotas', router)

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))

const personas = [{nombre: 'Esteban', apellido: 'Chevalier', edad: '39'}]
const mascotas = [{nombre: 'Kaisa', raza: 'generico', edad: '3' }]


// ROUTER GET

router.get('/',  (req, res) => {
    console.log(`GET Request received from ${req.originalUrl}`);
    let origin = req.originalUrl.slice(1)
    res.json( origin === 'mascotas'? mascotas: personas)
})


// ROUTER POST

router.post('/',  (req, res) => {
    console.log(`POST Request received from ${req.originalUrl}`);
    let origin = req.originalUrl.slice(1)
    origin === 'mascotas' ? mascotas.push(req.body):personas.push(req.body)
    res.json( origin === 'mascotas'? mascotas: personas )
})




