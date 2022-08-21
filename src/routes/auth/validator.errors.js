const {BAD_REQUEST} = require('../../constants/httpCodes')

module.exports = {
    USERNAME_REQUIRED: {
        error: 'username: query parameter is required',
        code: BAD_REQUEST
    },
    PASSWORD_REQUIRED: {
        error: 'password: query parameter is required',
        code: BAD_REQUEST
    }
}
