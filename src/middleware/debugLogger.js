const logger = require('../services/logger')(module)

module.exports = (req, res, next) => {
    logger.debug()
    next()
}
