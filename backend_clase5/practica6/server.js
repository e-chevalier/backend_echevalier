import express from 'express';
import path from 'path';
const __dirname = path.resolve();

const app = express()

const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(express.static('node_modules/bootstrap/dist'))


app.set('views', './views'); // especifica el directorio de vistas
app.set('view engine', 'ejs'); // registra el motor de plantillas

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}
                 Open link to http://127.0.0.1:${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))

//{name: 'Pedro', surname: 'Lopez', age: 23 }
const fakeApi = [{name: 'Pedro', surname: 'Lopez', age: 23 }, 
                 {name: 'Luis', surname: 'Guzman', age: 33 }]

app.get('/', (req, res) => { 
    console.log(fakeApi.length) 
    res.render('page/form', {data: fakeApi})
})

app.post('/personas', (req, res) => {
    console.log(req.body)
    fakeApi.push(req.body)
    res.render('page/form', {data: fakeApi})
})







