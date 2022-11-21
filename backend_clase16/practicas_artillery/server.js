import compression from 'compression'
import express from 'express'
import config from './config/index.js'
import cors from 'cors'
import { serverRoutes } from './routes/index.js'
//import logger from './config/log4js_config.js'
import logger from './config/winston_config.js'
//import logger from './config/pino_config.js'

import cluster from 'cluster'
import os from 'os'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'


const app = express()

app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('static'))
app.use(cors("*"))

serverRoutes(app)

logger.info(`Valor de entorno NODE_ENV: ${process.env.NODE_ENV}`);



const numCPUs = os.cpus().length

const argv = yargs(hideBin(process.argv))
    .default({
        modo: 'FORK',
        puerto: 8080
    })
    .alias({
        m: 'modo',
        p: 'puerto'
    })
    .argv

const PORT = argv.puerto



if (argv.modo.toUpperCase() == 'CLUSTER') {

    if (cluster.isPrimary) {
        logger.info(`Master Cluster PID ${process.pid} is running.`)

        // FORK WORKER
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork()
        }

        cluster.on('exit', (worker, code, signal) => {
            logger.info(`worker ${worker.process.pid} died.`)
            cluster.fork()
        })

    } else {

        const server = app.listen(PORT, (err) => {
            if (err) {
                logger.error("Error while starting server")
            } else {
                logger.info(
                    `
                    ------------------------------------------------------------
                    WORKER ${server.address().port}  Process Pid: ${process.pid}
                    Open link to http://localhost:${server.address().port}?max=10     
                    -------------------------------------------------------------
                    `
                )
            }
        })

        server.on('error', error => logger.error(`Error en servidorProcess Pid: ${process.pid}: ${error}`))
    }
    
} else {

    const server = app.listen(PORT, 'localhost', (err) => {
        if (err) {
            logger.error("Error while starting server")
        } else {
            logger.info(
                `
                ------------------------------------------------------------
                Servidor http escuchando en el puerto ${server.address().port}
                Open link to http://localhost:${server.address().port}?max=10      
                -------------------------------------------------------------
                `
            )
        }
    })

    server.on('error', error => logger.error(`Error en servidor ${error}`))

}

