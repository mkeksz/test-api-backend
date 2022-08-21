const {Forbidden} = require('../../apiErrors')
const {USERNAME, PASSWORD} = require('../../config').AUTH
const jwt = require('../../services/jwt')

function get(req, res) {
    const {username, password} = req.query
    if (username !== USERNAME || password !== PASSWORD) throw new Forbidden('No user passed')
    const token = jwt.sign({username})
    res.header('Authorization', `Bearer ${token}`)
    return res.sendStatus(200)
}

module.exports = {get}
