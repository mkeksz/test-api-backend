const logger = require('../../services/logger')(module)
const {ApiError, InternalError, BadRequest} = require('../../apiErrors')

const errorsHandler = [
    (error, req, res, next) => {
        if (!error) next()
        logger.error(error)
        if (!(error instanceof ApiError)) {
            if (error.type === 'entity.parse.failed') throw new BadRequest()
            throw new InternalError()
        }
        throw error
    },
    (error, req, res, next) => {
        logger.error(`Request finished with code "${error.httpCode}" error "${error.code}"`)
        res.header('Content-Type', 'application/json')
        res.status(error.httpCode).send({code: error.code, error: error.message})
        next()
    }
]

module.exports = errorsHandler
