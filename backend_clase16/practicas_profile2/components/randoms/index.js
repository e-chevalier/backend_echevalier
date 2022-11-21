import express from 'express'
import { randomsController } from './controllers/randomsController.js'

export const randomsApi = (app) => {

    let router = express.Router()
    app.use('/api/randoms', router)

    router.get('/randoms-nodebug', randomsController.randoms_nodebug)
    
    router.get('/randoms-debug', randomsController.randoms_debug)
}
