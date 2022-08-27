const {Types} = require('mongoose')
const {check} = require('express-validator')
const validationErrorHandler = require('./validationErrorHandler')
const errorCodes = require('../constants/errors')

/**
 * Проверяет список указанных параметров запроса на соответствие формату ID MongoDB.
 * @param {String[]} fields
 * @param {boolean} isOptional
 * @return {*[]}
 */
function isMongoId(fields, isOptional = false) {
    return [
        ...fields.map(field =>
            check(field)
                .if(value => !isOptional || typeof value !== 'undefined')
                .isMongoId().withMessage(getMongoIDError(field))
                .bail()
                .customSanitizer(value => new Types.ObjectId(value))
        ),
        validationErrorHandler
    ]
}

function getMongoIDError(field) {
    return {
        error: `${field}: parameter must be of MongoID format`,
        code: errorCodes.BAD_REQUEST.code
    }
}

module.exports = {getMongoIDError, isMongoId}
