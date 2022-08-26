const {body} = require('express-validator')
const validationErrorHandler = require('../../middleware/validationErrorHandler')
const validatorErrors = require('./validator.errors')

module.exports = [
    body('firstname').trim().exists().withMessage(validatorErrors.FIRSTNAME_REQUIRED),
    body('lastname').trim().exists().withMessage(validatorErrors.LASTNAME_REQUIRED),
    body('patronymic').trim().exists().withMessage(validatorErrors.PATRONYMIC_REQUIRED),
    body('phone')
        .exists().withMessage(validatorErrors.PHONE_REQUIRED)
        .bail()
        .isMobilePhone('any').withMessage(validatorErrors.PHONE_INVALID),
    body('email')
        .exists().withMessage(validatorErrors.EMAIL_REQUIRED)
        .bail()
        .isEmail().withMessage(validatorErrors.EMAIL_INVALID),
    validationErrorHandler
]
