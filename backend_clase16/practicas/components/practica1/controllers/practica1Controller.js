import { practica1Service } from '../services/practica1Service.js'

class Practica1 {
    async saludo(req, res, next) {
        try {
            let {status, response} = await practica1Service.saludo()
            // Add Header
            res.setHeader('Cache-Control', 'no-transform')
            res.json(response)
        } catch (error) {
            console.log(error)
        }
    }

    async saludoZip(req, res, next) {
        try {
            let {status, response} = await practica1Service.saludo()
            res.json(response)
        } catch (error) {
            console.log(error)
        }
    }
    
}

export let practica1Controller = new Practica1()
