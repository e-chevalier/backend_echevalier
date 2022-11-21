import express from 'express';
import path from 'path';
const __dirname = path.resolve();

const app = express()

const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.set('views', './views'); // especifica el directorio de vistas
app.set('view engine', 'pug'); // registra el motor de plantillas

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}
                 Open link to http://127.0.0.1:${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))

app.get('/hello', (req, res) => {
    res.render('hello.pug', {mensaje: "HOLA MUNDO"})
})

app.get('/datos', (req, res) => {
    let params = req.query
    console.log(params)
    res.render('meter.pug', params)
})

// TEST: http://localhost:8080/datos?min=10&nivel=15&max=20&titulo=%3Ci%3EMedidor%3C/i%3E





