const ApiError = require('./ApiError')
const errors = require('../constants/errors')

class InternalError extends ApiError {
    constructor(message) {
        super({
            code: errors.INTERNAL_ERROR.code,
            httpCode: errors.INTERNAL_ERROR.httpCode,
            message: message || errors.INTERNAL_ERROR.message
        })
    }
}

module.exports = InternalError
