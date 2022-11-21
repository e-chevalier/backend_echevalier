import logger from "../../../config/log4js_config.js"
//import logger from "../../../config/winston_config.js"
//import logger from "../../../config/pino_config.js"

class Randoms {

    async randoms(req) {
        try {

            let randoms = []

            for( let i=0; i < 1000 ; i++){
                randoms.push(Math.floor(Math.random() * (10)))
            }

            return { randoms: randoms }

        } catch (error) {
            logger.error(`${error}`)
        }
    }
}

export let randomsService = new Randoms()