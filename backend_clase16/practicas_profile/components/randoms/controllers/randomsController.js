import logger from '../../../config/log4js_config.js'
import { randomsService } from '../services/randomsService.js'

class Randoms {
    async randoms_nodebug(req, res, next) {
        try {
            let {randoms} = await randomsService.randoms(req)
            res.json(randoms)
        } catch (error) {
            logger.error(error)
        }
    }

    async randoms_debug(req, res, next) {
        try {
            let {randoms} = await randomsService.randoms(req)
            console.log(randoms)
            res.json(randoms)
        } catch (error) {
            logger.error(error)
        }
    }
}

export let randomsController = new Randoms()
