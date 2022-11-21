//import logger from "../config/log4js_config.js"
import logger from "../config/winston_config.js"
///import logger from "../config/pino_config.js"

import { practica1Api } from "../components/practica1/index.js"
import { practica2Api } from "../components/practica2/index.js"


export const serverRoutes = ( app ) => {
    practica1Api(app)
    practica2Api(app)

    app.get("/", (req, res, next) => {
        res.send("Todo ok")
    })
    /**
    * Undefined endpoint
    */
    app.all('*', (req, res, next) => {
        logger.warn(`Invalid resource ${req.protocol + '://' + req.get('host') + req.originalUrl}`)
        res.json({ error: -2, descripcion: `Ruta ${req.url} método ${req.method} no implementada.` })
    })
}