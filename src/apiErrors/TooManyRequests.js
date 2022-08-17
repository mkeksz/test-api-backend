const errors = require('../constants/errors')
const ApiError = require('./ApiError')

class TooManyRequests extends ApiError {
    constructor(message) {
        super({
            code: errors.TOO_MANY_REQUESTS.code,
            httpCode: errors.TOO_MANY_REQUESTS.httpCode,
            message: message || errors.TOO_MANY_REQUESTS.message
        })
    }
}

module.exports = TooManyRequests
