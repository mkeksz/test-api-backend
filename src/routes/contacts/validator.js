const {body} = require('express-validator')
const validationErrorHandler = require('../../middleware/validationErrorHandler')
const validatorErrors = require('./validator.errors')

module.exports = [
    body('firstname').trim().notEmpty().withMessage(validatorErrors.FIRSTNAME_REQUIRED),
    body('lastname').trim().notEmpty().withMessage(validatorErrors.LASTNAME_REQUIRED),
    body('patronymic').trim().notEmpty().withMessage(validatorErrors.PATRONYMIC_REQUIRED),
    body('phone')
        .notEmpty().withMessage(validatorErrors.PHONE_REQUIRED)
        .bail()
        .isMobilePhone('any').withMessage(validatorErrors.PHONE_INVALID),
    body('email')
        .notEmpty().withMessage(validatorErrors.EMAIL_REQUIRED)
        .bail()
        .isEmail().withMessage(validatorErrors.EMAIL_INVALID),
    validationErrorHandler
]
