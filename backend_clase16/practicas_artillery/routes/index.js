import logger from "../config/log4js_config.js"
//import logger from "../config/winston_config.js"
//import logger from "../config/pino_config.js"

import { practica1Api } from "../components/practica1/index.js"
import { practica2Api } from "../components/practica2/index.js"

function isPrime(num) {
    if ([2, 3].includes(num)) return true;
    else if ([2, 3].some(n => num % n == 0)) return false;
    else {
        let i = 5, w = 2;
        while ((i ** 2) <= num) {
            if (num % i == 0) return false
            i += w
            w = 6 - w
        }
    }
    return true
 }

export const serverRoutes = (app) => {
    practica1Api(app)
    practica2Api(app)

    app.get("/", (req, res, next) => {
        const primes = []
        const max = Number(req.query.max) || 1000
        for (let i = 1; i <= max; i++) {
            if (isPrime(i)) primes.push(i)
        }
        res.json(primes)
    })
    /**
    * Undefined endpoint
    */
    app.all('*', (req, res, next) => {
        logger.warn(`Invalid resource ${req.protocol + '://' + req.get('host') + req.originalUrl}`)
        res.json({ error: -2, descripcion: `Ruta ${req.url} método ${req.method} no implementada.` })
    })
}