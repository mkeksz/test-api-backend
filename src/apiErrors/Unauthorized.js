const errors = require('../constants/errors')
const ApiError = require('./ApiError')

class Unauthorized extends ApiError {
    constructor(message) {
        super({
            code: errors.UNAUTHORIZED.code,
            httpCode: errors.UNAUTHORIZED.httpCode,
            message: message || errors.UNAUTHORIZED.message
        })
    }
}

module.exports = Unauthorized
