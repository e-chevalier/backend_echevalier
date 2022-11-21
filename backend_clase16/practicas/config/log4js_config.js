import log4js from 'log4js'

log4js.configure({
    appenders:{
        console: {type: 'console'},
        debugFile: {type: 'file', filename: 'debug.log'},
        errorFile: {type: 'file', filename: 'error.log'},
        loggerConsole: {type: 'logLevelFilter', appender: 'console', level: 'info'},
        loggerDebugFile: {type: 'logLevelFilter', appender: 'debugFile', level: 'debug'},
        loggerErrorFile: {type: 'logLevelFilter', appender: 'errorFile', level: 'error'}
    },
    categories:{
        default: {appenders: ['loggerConsole'], level: 'all'},
        development: {appenders: ['loggerConsole'], level: 'all'},
        production: {appenders: ['loggerDebugFile', 'loggerErrorFile'], level: 'all'}
    }
})

const logger = log4js.getLogger(process.env.NODE_ENV == 'PROD'? 'production':'default')

export default logger