const contactMethods = require('../../mongo/testDB/models/contact/methods')
const {OK} = require('../../constants/httpCodes')
const {normalizeContact} = require('./service')

async function post(req, res) {
    const contact = await contactMethods.create(req.body)
    const result = normalizeContact(contact)
    res.status(OK).json(result)
}

module.exports = {post}
