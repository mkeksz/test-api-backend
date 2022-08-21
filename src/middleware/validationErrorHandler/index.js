const expressValidator = require('express-validator')
const logger = require('../../services/logger')(module)
const {BadRequest} = require('../../apiErrors')
const {validationErrorToLogMessage} = require('./helper')

module.exports = (req, res, next) => {
    const validationErrors = expressValidator.validationResult(req)
    if (!validationErrors.isEmpty()) {
        const errorsToLog = []
        const errorsToReturn = []

        for (const error of validationErrors.array()) {
            if (error.msg?.error) errorsToReturn.push(error.msg?.error)
            const logMessage = validationErrorToLogMessage(error)
            errorsToLog.push(logMessage)
        }

        logger.error(errorsToLog.join(', '))
        const errorMessage = errorsToReturn.length ? errorsToReturn.join(',') : undefined
        throw new BadRequest(errorMessage)
    }
    next()
}
