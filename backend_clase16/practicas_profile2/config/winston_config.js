import winston from 'winston'

const loggerDevelopment = winston.createLogger({
    level: "development",
    transports : [
        new winston.transports.Console({ level:'info' })
    ] 
})

const loggerProduction = winston.createLogger({
    level: "production",
    transports : [
        new winston.transports.File({ filename: 'winston_debug.log', level:'debug' }),
        new winston.transports.File({ filename: 'winston_error.log', level:'error' })
    ] 
})

const logger = process.env.NODE_ENV == "PROD"? loggerProduction: loggerDevelopment

export default logger

