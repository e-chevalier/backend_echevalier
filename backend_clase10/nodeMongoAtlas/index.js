import express, { urlencoded } from 'express'
import cors from 'cors'
import { config } from './config/index.js'
import { serverRoutes } from './routes/index.js'
import mongoose from 'mongoose'
//import * as model from './models/usuario.js' 
import * as model from './models/estudiantes.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors("*"))

const PORT = config.port || 5003
const DB_PASS = config.db_pass
const DB_DOMAIN = config.db_domain
const DB_NAME = config.db_name
const DB_USER = config.db_user


serverRoutes(app)

const connectDB = async () => {
    try {
        const URL = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_DOMAIN}/${DB_NAME}?retryWrites=true&w=majority`
        const options = { useNewUrlParser: true, useUnifiedTopology: true }
        await mongoose.connect(URL, options)
        console.log('MongoDB connected!!')
    } catch (err) {
        console.log('Failed to connect to MongoDB', err)
    }
}

const data = [
    { nombre: 'Pedro', apellido: 'Mei', edad: 21, dni: '31155898', curso: '1A', nota: 7 },
    { nombre: 'Ana', apellido: 'Gonzalez', edad: 32, dni: '27651878', curso: '1A', nota: 8 },
    { nombre: 'José', apellido: 'Picos', edad: 29, dni: '34554398', curso: '2A', nota: 6 },
    { nombre: 'Lucas', apellido: 'Blanco', edad: 22, dni: '30355874', curso: '3A', nota: 10 },
    { nombre: 'María', apellido: 'García', edad: 36, dni: '29575148', curso: '1A', nota: 9 },
    { nombre: 'Federico', apellido: 'Perez', edad: 41, dni: '320118321', curso: '2A', nota: 5 },
    { nombre: 'Tomas', apellido: 'Sierra', edad: 19, dni: '38654790', curso: '2B', nota: 4 },
    { nombre: 'Carlos', apellido: 'Fernández', edad: 33, dni: '26935670', curso: '3B', nota: 2 },
    { nombre: 'Fabio', apellido: 'Pieres', edad: 39, dni: '4315388', curso: '1B', nota: 9 },
    { nombre: 'Daniel', apellido: 'Gallo', edad: 25, dni: '37923460', curso: '3B', nota: 2 }
]


connectDB()

console.log("INSERT DATA")

if (await model.estudiantes.exists()) {
    console.log("La collection estudiantes ya existe.")
} else {
    console.log("No existe la collection estudiantes.")
    await model.estudiantes.insertMany(data)
}



//console.log("READALL")
//let users = await model.estudiantes.find({})
//console.log(users)

const server = app.listen(PORT, (err) => {
    if (err) {
        console.log("Error while starting server")
    } else {
        console.log(`Servidor http escuchando en el puerto ${server.address().port}
                 Open link to http://127.0.0.1:${server.address().port}`)
    }

})

server.on('error', error => console.log(`Error en servidor ${error}`))


// //console.log("----- a) Los estudiantes ordenados por orden alfabético según sus nombres.")
// //let usersA = await model.estudiantes.find().sort({'nombre': 1})
// //console.log(usersA)
// //console.log("-----------------------------------------------------------------------")

await model.estudiantes.find().sort({ 'nombre': 1 }).exec()
    .then(res => {
        console.log("----- a) Los estudiantes ordenados por orden alfabético según sus nombres.")
        console.log(res)
    })
    .catch((error) => console.log(error))


// // console.log(" ----- b) El estudiante más joven.")
// // let usersB = await model.estudiantes.find().sort({'edad': 1, '_id': 1}).limit(1)
// // console.log(usersB)
// // console.log("-----------------------------------------------------------------------")
// await model.estudiantes.find().sort({ 'edad': 1, '_id': 1 }).limit(1).exec()
//     .then(res => {
//         console.log(" ----- b) El estudiante más joven.")
//         console.log(res)
//     })
//     .catch((error) => console.log(error))

// // console.log(" ----- c) Los estudiantes que pertenezcan al curso '2A'.")
// // let usersC = await model.estudiantes.find({'curso': '2A'})
// // console.log(usersC)
// // console.log("-----------------------------------------------------------------------")
// await model.estudiantes.find({ 'curso': '2A' }).exec()
//     .then(res => {
//         console.log(" ----- c) Los estudiantes que pertenezcan al curso '2A'.")
//         console.log(res)
//     })
//     .catch((error) => console.log(error))


// // console.log(" ----- d)  El segundo estudiante más joven")
// // let usersD = await model.estudiantes.find().sort({'edad': 1, '_id': 1}).skip(1).limit(1)
// // console.log(usersD)
// // console.log("-----------------------------------------------------------------------")
// await model.estudiantes.find().sort({ 'edad': 1, '_id': 1 }).skip(1).limit(1).exec()
//     .then(res => {
//         console.log(" ----- d)  El segundo estudiante más joven")
//         console.log(res)
//     })
//     .catch((error) => console.log(error))


// // console.log(" ----- e)  Sólo los nombres y apellidos de los estudiantes con su curso correspondiente, ordenados por apellido descendente (z a a)")
// // let usersE = await model.estudiantes.find({}, {'nombre': 1, 'apellido': 1, 'curso': 1,  '_id': 0}).sort({'apellido': -1})
// // console.log(usersE)
// // console.log("-----------------------------------------------------------------------")
// await model.estudiantes.find({}, { 'nombre': 1, 'apellido': 1, 'curso': 1, '_id': 0 }).sort({ 'apellido': -1 }).exec()
//     .then(res => {
//         console.log(" ----- e)  Sólo los nombres y apellidos de los estudiantes con su curso correspondiente, ordenados por apellido descendente (z a a)")
//         console.log(res)
//     })
//     .catch((error) => console.log(error))


// // console.log(" ----- f) Los estudiantes que sacaron 10.")
// // let usersF = await model.estudiantes.find({'nota' : 10})
// // console.log(usersF)
// // console.log("-----------------------------------------------------------------------")
// await model.estudiantes.find({ 'nota': 10 }).exec()
//     .then(res => {
//         console.log(" ----- f) Los estudiantes que sacaron 10.")
//         console.log(res)
//     })
//     .catch((error) => console.log(error))

// // console.log(" ----- g)  El promedio de notas del total de alumnos.")
// // let usersG = await model.estudiantes.aggregate([
// //         { $group: { _id: null, promedio: { $avg: '$nota' }}},
// //         { $project: { '_id': 0, 'promedio': 1 } }
// // ])
// // console.log(usersG)
// // console.log("-----------------------------------------------------------------------")
// await model.estudiantes.aggregate([
//     { $group: { _id: null, promedio: { $avg: '$nota' } } },
//     { $project: { '_id': 0, 'promedio': 1 } }
// ]).exec()
//     .then(res => {
//         console.log(" ----- g)  El promedio de notas del total de alumnos.")
//         console.log(res)
//     })
//     .catch((error) => console.log(error))

// // console.log(" ----- h)  El promedio de notas del curso 1A")
// // let usersH = await model.estudiantes.aggregate([
// //         { $match: { 'curso': '1A'}},
// //         { $group: { _id: null, promedio_1A: { $avg: '$nota' }}},
// //         { $project: { '_id': 0, 'promedio_1A': 1 } }
// // ])
// // console.log(usersH)
// // console.log("-----------------------------------------------------------------------")
// await model.estudiantes.aggregate([
//     { $match: { 'curso': '1A' } },
//     { $group: { _id: null, promedio_1A: { $avg: '$nota' } } },
//     { $project: { '_id': 0, 'promedio_1A': 1 } }
// ]).exec()
//     .then(res => {
//         console.log(" ----- h)  El promedio de notas del curso 1A")
//         console.log(res)
//     })
//     .catch((error) => console.log(error))




// console.log("-- 1) Actualizar el dni del estudiante Lucas Blanco a 20355875")
// let users1 = await model.estudiantes.updateOne({'nombre': 'Lucas', 'apellido': 'Blanco'}, {$set: {'dni': '20355875'}})
// console.log(users1)
// console.log(await model.estudiantes.find({'nombre': 'Lucas', 'apellido': 'Blanco'}))
// console.log("-----------------------------------------------------------------------")


// //OBS Strict permite el insert de elementos que no complan con el schema 100%
// console.log("-- 2) Agregar un campo 'ingreso' a todos los documentos con el valor false")
// let users2 = await model.estudiantes.updateMany({}, {$set: {ingreso: false}},{ strict: false })
// console.log(users2)
// console.log(await model.estudiantes.find())
// console.log("-----------------------------------------------------------------------")


// console.log("-- 3) Modificar el valor de ingreso a true para todos los estudiantes que pertenezcan al curso 1A")
// let users3 = await model.estudiantes.updateMany({'curso': '1A'}, {$set: {ingreso: true}},{ strict: false })
// console.log(users3)
// console.log(await model.estudiantes.find({curso: '1A'}))
// console.log("-----------------------------------------------------------------------")


// console.log("-- 4) Listar los estudiantes que aprobaron (hayan sacado de 4 en adelante) sin los campos de _id y __v")
// let users4 = await model.estudiantes.find({'nota': {$gte: 4}},{'_id': 0, '__v': 0 })
// console.log(users4)
// console.log("-----------------------------------------------------------------------")


// //OBS: strictQuery: false Permite el casteo de propieades que no esten en el schema
// console.log("-- 5) Listar los estudiantes que posean el campo 'ingreso' en true sin los campos de _id y __v")
// let users5 = await model.estudiantes.find({'ingreso': true} ,{'_id': 0, '__v': 0 }, { strictQuery: false })
// console.log(users5)
// console.log("-----------------------------------------------------------------------")

// // // SACAR DE SCHEMA EL UNIQUE DE DNI
// // console.log("-- 6) Borrar de la colección de estudiantes los documentos cuyo campo 'ingreso' esté en true")
// // let users6 = await model.estudiantes.updateMany({'ingreso': true} ,{ $unset: { dni: ""} }, {strictQuery: false })
// // console.log(users6)
// // console.log("-----------------------------------------------------------------------")


// console.log("-- 7) Listar el contenido de la colección estudiantes utilizando la consola, imprimiendo en cada caso los datos almacenados (sin el campo __v) junto a su fecha de creación obtenida del ObjectID en formato YYYY/MM/DD HH:mm:SS.")
// let users7 = await model.estudiantes.find()
// users7.forEach(e => console.log(`${e} => Fecha de creación: ${e._id.getTimestamp().toLocaleString()}`))
// console.log("-----------------------------------------------------------------------")