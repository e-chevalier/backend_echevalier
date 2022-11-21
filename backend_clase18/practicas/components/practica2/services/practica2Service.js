import logger from "../../../utils/logger/winston.js"

class Practica2 {

    async sumar(req) {
        try {
            
            let {a, b} = req.query
            let response = null

            if ( a && b ) {
                    response = Number(a) + Number(b)
                    // EXITO
                    logger.info(`SUCCESS: The sum of ${a} + ${b} = ${response}`)
            } else {
                if( !a ) {
                    logger.error(`Missing parameter a of sum`)
                }
                if (!b ) {
                    logger.error(`Missing parameter b of sum`)
                }
            }
            return { status: "OK", response: response }

        } catch (error) {
            logger.error(`${error}`)
        }
    }
}

export let practica2Service = new Practica2()