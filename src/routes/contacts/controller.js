const contactMethods = require('../../mongo/testDB/models/contact/methods')
const {OK} = require('../../constants/httpCodes')
const {normalizeContact} = require('./service')
const {NotFound} = require('../../apiErrors')

async function post(req, res) {
    const contact = await contactMethods.create(req.body)
    const result = normalizeContact(contact)
    res.status(OK).json(result)
}

async function get(req, res) {
    const {id} = req.params
    const contact = await contactMethods.getByID(id)
    if (!contact) throw new NotFound()
    const result = normalizeContact(contact)
    res.status(OK).json(result)
}

module.exports = {post, get}
