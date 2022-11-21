import { practica2Service } from '../services/practica2Service.js'

class Practica2 {
    async sumar(req, res, next) {
        try {
            let {status, response} = await practica2Service.sumar(req)
            res.json(response)
        } catch (error) {
            console.log(error)
        }
    }
}

export let practica2Controller = new Practica2()
