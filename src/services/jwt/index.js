const jwt = require('jsonwebtoken')
const {JWT} = require('../../../config')

function sign(payload) {
    return jwt.sign(payload, JWT.SECRET_KEY, {expiresIn: JWT.TTL, issuer: JWT.SIGN.ISSUER})
}

module.exports = {sign}
