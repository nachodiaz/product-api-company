import { createLogger, format, transports } from 'winston'

module.exports = createLogger({
    transports: [
        new transports.File({
            maxsize: 5120000,
            maxFiles: 5,
            filename: `${__dirname}/logs/info.log`
        }),
        new transports.Console({
            level: 'debug',
            format: format.combine(
                format.simple(),
                format.colorize(),
                format.timestamp(),
                format.prettyPrint(),
            
                format.printf(info => `${info.level} : ${info.message},  ${info.timestamp} `)
            )
        }),
        new transports.Console({
            level: 'error',
            format: format.combine(
                format.simple(),
                format.colorize(),
                format.timestamp(),
                format.prettyPrint(),
            
                format.printf(info => `${info.level} : ${info.message},  ${info.timestamp} `)
            )
        })
    ]
})
  