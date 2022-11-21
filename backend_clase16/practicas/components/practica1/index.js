import express from 'express'
import { practica1Controller } from './controllers/practica1Controller.js'

export const practica1Api = (app) => {

    let router = express.Router()
    app.use('/api/practica1', router)

    router.get('/saludo', practica1Controller.saludo)
    
    router.get('/saludozip', practica1Controller.saludoZip)
}
