import compression from 'compression'
import express from 'express'
import config from './config/index.js'
import cors from 'cors'
import { serverRoutes } from './routes/index.js'
import logger from './utils/logger/winston.js'


const PORT = config.port

const app = express()

app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('static'))
app.use(cors("*"))

serverRoutes(app)

logger.info(`Valor de entorno NODE_ENV: ${process.env.NODE_ENV}`);

const server = app.listen(PORT, (err) => {
    if (err) {
        logger.error("Error while starting server")
    } else {
        logger.info(`
            Servidor http escuchando en el puerto ${server.address().port}
            Open link to http://127.0.0.1:${server.address().port}`
        )
    }
})

server.on('error', error => logger.error(`Error en servidor ${error}`))
