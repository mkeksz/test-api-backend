const connection = require('../../index')

async function getByID(id) {
    const {Contact} = connection().models
    return Contact.findById(id)
}

/**
 * @param {{
 *     firstname: string,
 *     lastname: string,
 *     patronymic: string,
 *     phone: string,
 *     email: string
 * }} contact
 * @returns {Promise<void>}
 */
function create(contact) {
    const {Contact} = connection().models
    return Contact.create({
        firstname: contact.firstname,
        lastname: contact.lastname,
        patronymic: contact.patronymic,
        phone: contact.phone,
        email: contact.email
    })
}

module.exports = {getByID, create}
