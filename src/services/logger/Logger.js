const httpContext = require('express-http-context')
const {configureLogger} = require('./service')
const {LOG: config} = require('../../config')
const {getModuleLabel} = require('./helper')

class Logger {
    constructor(callingModule) {
        this.moduleLabel = getModuleLabel(callingModule)
        this.context = null
        const logger = configureLogger()
        this.combinedLogger = logger.getLogger('combined')
        this.errorLogger = logger.getLogger('error')
    }

    init(context) {
        this.context = context
        this.combinedLogger.info(this._formatMessage('started'))
    }

    info(message) {
        this.combinedLogger.info(this._formatMessage(message))
    }

    warn(message) {
        this.combinedLogger.warn(this._formatMessage(message))
    }

    error(message) {
        this.combinedLogger.error(this._formatMessage(message))
        this.errorLogger.error(this._formatMessage(message))
    }

    debug(message) {
        if (config.DEBUG) this.combinedLogger.debug(this._formatMessage(message))
    }

    success() {
        this.combinedLogger.info(this._formatMessage('succeed'))
    }

    _formatMessage(message) {
        const reqMethod = httpContext.get('method')
        const reqPath = httpContext.get('path')

        const messageAttributes = []
        if (this.moduleLabel) messageAttributes.push(`[${this.moduleLabel}]`)
        if (reqMethod) messageAttributes.push(reqMethod)
        if (reqPath) messageAttributes.push(reqPath)
        if (this.context) messageAttributes.push(this.context)

        const isError = message instanceof Error
        if (config.DEBUG && isError) messageAttributes.push(`${message.message} ${message.stack}`)
        else if (isError) messageAttributes.push(message.message)
        else messageAttributes.push(message)

        return messageAttributes.join(' ')
    }
}

module.exports = Logger
