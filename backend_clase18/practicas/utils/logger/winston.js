import { createLogger, format, transports } from 'winston'
const { combine, timestamp, prettyPrint, colorize } = format;

const LEVEL = Symbol.for('level');

/**
 * Log only the messages the match `level`.
 */
 function filterOnly(level) {
    return format(function (info) {
        if (info[LEVEL] === level) {
            return info;
        }
    })();
}

const loggerDevelopment = {
    level: "development",
    transports: [
        new transports.Console({ 
            format: combine(
                prettyPrint(),
                colorize({all: true})
            ),
            level: 'info' 
        })
    ]
}

const loggerProduction = {
    level: "production",
    transports: [
        new transports.File({
            filename: './logs/winston_warn.log',
            format: combine(
                filterOnly('warn'),
                timestamp(),
                prettyPrint()
                //colorize({all: true})
            ),
            level: 'warn'
        }),
        new transports.File({
            filename: './logs/winston_error.log',
            format: combine(
                filterOnly('error'),
                timestamp(),
                prettyPrint()
                //colorize({all: true})
            ),
            level: 'error'
        })
    ]
}

const logger = process.env.NODE_ENV == "PROD" ? createLogger(loggerProduction) : createLogger(loggerDevelopment)

export default logger
