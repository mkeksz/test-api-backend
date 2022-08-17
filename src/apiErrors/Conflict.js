const errors = require('../constants/errors')
const ApiError = require('./ApiError')

class Conflict extends ApiError {
    constructor(message) {
        super({
            code: errors.CONFLICT.code,
            httpCode: errors.CONFLICT.httpCode,
            message: message || errors.CONFLICT.message
        })
    }
}

module.exports = Conflict
