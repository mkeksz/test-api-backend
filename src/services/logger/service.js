const {LOG} = require('../../config')
const log4js = require('log4js')

function configureLogger() {
    const config = {
        appenders: {
            error: {type: 'file', filename: LOG.ERROR_FILE},
            combined: {type: 'file', filename: LOG.COMBINED_FILE}
        },
        categories: {
            error: {appenders: ['error'], level: 'ERROR'},
            default: {appenders: ['combined'], level: 'ALL'}
        }
    }
    if (LOG.CONSOLE) {
        config.appenders.console = {type: 'console'}
        config.categories.default.appenders.push('console')
    }
    log4js.configure(config)
    return log4js
}

module.exports = {configureLogger}
