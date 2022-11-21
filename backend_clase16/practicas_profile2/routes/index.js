import logger from "../config/log4js_config.js"
//import logger from "../config/winston_config.js"
//import logger from "../config/pino_config.js"

import { randomsApi } from "../components/randoms/index.js"



export const serverRoutes = ( app ) => {
    randomsApi(app)

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