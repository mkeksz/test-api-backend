const errors = require('../constants/errors')
const ApiError = require('./ApiError')

class NotFound extends ApiError {
    constructor(message) {
        super({
            code: errors.NOT_FOUND.code,
            httpCode: errors.NOT_FOUND.httpCode,
            message: message || errors.NOT_FOUND.message
        })
    }
}

module.exports = NotFound
