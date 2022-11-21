import express, { urlencoded } from 'express'
import path from 'path'
import cors from 'cors'
import morgan from 'morgan'
import { config } from './config/index.js'
import { serverRoutes } from './routes/index.js'
//import admin from 'firebase-admin';
import { engine } from 'express-handlebars';

import { initializeApp, applicationDefault, cert } from 'firebase-admin/app'
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore'


const GOOGLE_APPLICATION_CREDENTIALS  = config.google_application_credentials
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors("*"))

// defino el motor de plantilla
app.engine('.hbs', engine({
    extname: ".hbs",
    defaultLayout: 'index.hbs',
    layoutDir: "views/layouts/",
    partialsDir: "views/partials/"
})
)

app.set('views', './views'); // especifica el directorio de vistas
app.set('view engine', '.hbs'); // registra el motor de plantillas
app.use(express.static('public'))

//serverRoutes(app)

initializeApp({
    credential: applicationDefault()
  });
  
const db = getFirestore();

// admin.initializeApp({
//     credential: admin.credential.applicationDefault(),
//     databaseURL: 'https://pnodetest.firebaseio.com'
// });

// const db = admin.firestore()

const PORT = config.port || 5003


const server = app.listen(PORT, (err) => {
    if (err) {
        console.log("Error while starting server")
    } else {
        console.log(`Servidor http escuchando en el puerto ${server.address().port}
                 Open link to http://127.0.0.1:${server.address().port}`)
    }

})

server.on('error', error => console.log(`Error en servidor ${error}`))


app.get('/', (req, res, next) => {
    res.render('main')
})

app.post('/new-contact', (req, res, next) => {
    console.log(req.body)
    const newContact = req.body
    // Add a new document with a generated id.
    db.collection('contacts').add(newContact)
        .then( res => console.log(res) )
        .catch(err => console.log(err));
    res.send('received!!!')
})

/**
* Undefined endpoint
*/
 app.all('*', (req, res, next) => {
    res.json({ error: -2, descripcion: `Ruta ${req.url} método ${req.method} no implementada.` })
})



