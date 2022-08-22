const jwt = require('jsonwebtoken')
const {JWT} = require('../../../config')

function sign(payload) {
    return jwt.sign(payload, JWT.SECRET_KEY, {expiresIn: JWT.TTL, issuer: JWT.SIGN.ISSUER})
}

function verify(token) {
    return jwt.verify(token, JWT.SECRET_KEY)
}

module.exports = {sign, verify}
