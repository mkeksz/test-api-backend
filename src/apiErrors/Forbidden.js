const errors = require('../constants/errors')
const ApiError = require('./ApiError')

class Forbidden extends ApiError {
    constructor(message) {
        super({
            code: errors.FORBIDDEN.code,
            httpCode: errors.FORBIDDEN.httpCode,
            message: message || errors.FORBIDDEN.message
        })
    }
}

module.exports = Forbidden
