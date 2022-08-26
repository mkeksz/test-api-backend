const {BAD_REQUEST} = require('../../constants/httpCodes')

module.exports = {
    FIRSTNAME_REQUIRED: {
        error: 'firstname: parameter is required',
        code: BAD_REQUEST
    },
    LASTNAME_REQUIRED: {
        error: 'lastname: parameter is required',
        code: BAD_REQUEST
    },
    PATRONYMIC_REQUIRED: {
        error: 'patronymic: parameter is required',
        code: BAD_REQUEST
    },
    PHONE_REQUIRED: {
        error: 'phone: parameter is required',
        code: BAD_REQUEST
    },
    PHONE_INVALID: {
        error: 'phone: parameter is invalid',
        code: BAD_REQUEST
    },
    EMAIL_REQUIRED: {
        error: 'email: parameter is required',
        code: BAD_REQUEST
    },
    EMAIL_INVALID: {
        error: 'email: parameter is invalid',
        code: BAD_REQUEST
    }
}
