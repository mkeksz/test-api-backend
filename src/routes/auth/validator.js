const {query} = require('express-validator')
const validationErrorHandler = require('../../middleware/validationErrorHandler')
const validatorErrors = require('./validator.errors')

module.exports = [
    query('username').exists().withMessage(validatorErrors.USERNAME_REQUIRED),
    query('password').exists().withMessage(validatorErrors.PASSWORD_REQUIRED),
    validationErrorHandler
]
