const httpCodes = require('./httpCodes')

module.exports = {
    BAD_REQUEST: {
        code: 'BAD_REQUEST',
        message: 'Illegal request params values',
        httpCode: httpCodes.BAD_REQUEST
    },
    UNAUTHORIZED: {
        code: 'UNAUTHORIZED',
        message: 'Unauthorized request',
        httpCode: httpCodes.UNAUTHORIZED
    },
    FORBIDDEN: {
        code: 'FORBIDDEN',
        message: 'Not enough permission to access this resource',
        httpCode: httpCodes.FORBIDDEN
    },
    NOT_FOUND: {
        code: 'NOT_FOUND',
        message: 'The requested entity is unavailable or doesn\'t exist',
        httpCode: httpCodes.NOT_FOUND
    },
    TOO_MANY_REQUESTS: {
        code: 'TOO_MANY_REQUESTS',
        message: 'Too many requests to access this resource',
        httpCode: httpCodes.TOO_MANY_REQUESTS
    },
    INTERNAL_ERROR: {
        code: 'INTERNAL_ERROR',
        message: 'Internal unexpected server error',
        httpCode: httpCodes.INTERNAL_ERROR
    },
    CONFLICT: {
        code: 'CONFLICT',
        message: 'Conflicting request',
        httpCode: httpCodes.CONFLICT
    }
}
