import winston from 'winston'
const LEVEL = Symbol.for('level');

/**
 * Log only the messages the match `level`.
 */
function filterOnly(level) {
    return winston.format(function (info) {
        if (info[LEVEL] === level) {
            return info;
        }
    })();
}

const loggerDevelopment = winston.createLogger({
    level: "development",
    transports: [
        new winston.transports.Console({ level: 'info' })
    ]
})

const loggerProduction = winston.createLogger({
    level: "production",
    transports: [
        new winston.transports.File({
            filename: 'winston_warn.log',
            format: filterOnly('warn'),
            level: 'warn'
        }),
        new winston.transports.File({
            filename: 'winston_error.log',
            format: filterOnly('error'),
            level: 'error'
        })
    ]
})

const logger = process.env.NODE_ENV == "PROD" ? loggerProduction : loggerDevelopment

export default logger

