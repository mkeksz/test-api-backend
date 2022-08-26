const httpContext = require('express-http-context')
const jwt = require('../services/jwt')
const logger = require('../services/logger')(module)
const {InternalError, Unauthorized} = require('../apiErrors')

module.exports = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) throw new Unauthorized()

    try {
        const decoded = jwt.verify(token)
        httpContext.set('user', decoded?.username)
        return next()
    } catch (error) {
        if (jwt.isInvalidTokenError(error)) throw new Unauthorized('Invalid auth token')
        logger.error(error)
        throw new InternalError()
    }
}
