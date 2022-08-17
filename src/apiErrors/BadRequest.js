const errors = require('../constants/errors')
const ApiError = require('./ApiError')

class BadRequest extends ApiError {
    constructor(message) {
        super({
            code: errors.BAD_REQUEST.code,
            httpCode: errors.BAD_REQUEST.httpCode,
            message: message || errors.BAD_REQUEST.message
        })
    }
}

module.exports = BadRequest
