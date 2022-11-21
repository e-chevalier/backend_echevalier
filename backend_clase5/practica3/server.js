import express from 'express';
import path from 'path';
import { engine } from 'express-handlebars';
const __dirname = path.resolve();

const app = express()

const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// defino el motor de plantilla
app.engine('.hbs', engine({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
        layoutDir: __dirname + "views/layout",
        partialsDir: __dirname + "views/partials"
        })
)

app.set('views', './views'); // especifica el directorio de vistas
app.set('view engine', '.hbs'); // registra el motor de plantillas

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}
                 Open link to http://127.0.0.1:${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))


const fakeApi = () => [
    { nombre: 'Esteban', apellido: 'Chevalier', edad: 39, email: 'estebanchevalier@gmail.com', telefono: '3512412907'},
    { nombre: 'Daniela', apellido: 'Quintero', edad: 34, email: 'anadaniquintero@gmail.com', telefono: '3517441616'},
    { nombre: 'Benjamin', apellido: 'Barg', edad: 10, email: 'bbarg123@gmail.com', telefono: '351212355'}
]


app.get('/', (req, res) => {
    res.render('main', {contacts: fakeApi(), listExists: true})
})







