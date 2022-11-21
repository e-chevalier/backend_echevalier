import pino from "pino";

const streamsDefault = [
    { stream: process.stdout }
];

const streamsProduction = [
    { 
        level: 'debug',
        stream: pino.destination(`pino_debug.log`) 
    },
    { 
        level: 'error',
        stream: pino.destination(`pino_error.log`) 
    }
];


const logger = pino(
    {
        level: process.env.NODE_ENV == "PROD"? 'debug'  : 'info',
        formatters: {
            level: (label) => {
                return { level: label };
            },
        },
    },

    pino.multistream(process.env.NODE_ENV == "PROD"? streamsProduction: streamsDefault)
);

export default logger

