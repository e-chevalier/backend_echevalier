import express from 'express';
import fs from 'node:fs'

const app = express()
const router = express.Router()

const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// defino el motor de plantilla
app.engine('cte', function (filePath, options, callback) {
    fs.readFile(filePath, function (err, content) {
        if (err) {
            return callback(new Error(err));
        }
        const rendered = content.toString()
            .replace('^^titulo$$', '' + options.titulo + '')
            .replace('^^mensaje$$', '' + options.mensaje + '')
            .replace('^^autor$$', '' + options.autor + '')
            .replace('^^version$$', '' + options.version + '')
            .replace('^^nombre$$', '' + options.nombre + '')
            .replace('^^apellido$$', '' + options.apellido + '')
            .replace('^^fecha$$', '' + options.fecha + '');
        return callback(null, rendered);
    });
});

app.set('views', './views'); // especifica el directorio de vistas
app.set('view engine', 'cte'); // registra el motor de plantillas


let obj = {
    titulo: "Harry Potter y la piedra filosofal",
    mensaje: "Harry Potter y la piedra filosofal es el primer volumen de la ya clásica serie de novelas fantásticas de la autora británica J.K. Rowling",
    autor: "J. K. Rowling",
    version: 1
}


const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}
                 Open link to http://127.0.0.1:${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))

app.get('/cte1', function (req, res) {
    res.render('plantilla1', obj);
});

app.get('/cte2', function (req, res) {
    res.render('plantilla2', {nombre: "Esteban", apellido: 'Chevalier', fecha: new Date().toLocaleString()});
});






