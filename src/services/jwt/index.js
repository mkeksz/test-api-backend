const jwt = require('jsonwebtoken')
const {JWT} = require('../../../config')
const {JsonWebTokenError} = require('jsonwebtoken')

function sign(payload) {
    return jwt.sign(payload, JWT.SECRET_KEY, {expiresIn: JWT.TTL, issuer: JWT.SIGN.ISSUER})
}

function verify(token) {
    return jwt.verify(token, JWT.SECRET_KEY)
}

function isInvalidTokenError(error) {
    return error instanceof JsonWebTokenError
        && (error.message === 'invalid signature' || error.message === 'jwt malformed')
}

module.exports = {sign, verify, isInvalidTokenError}
