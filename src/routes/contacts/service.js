const _ = require('lodash')

function normalizeContact(contact) {
    return {
        id: contact._id,
        ..._.pick(contact, ['firstname', 'lastname', 'patronymic', 'phone', 'email'])
    }
}

module.exports = {normalizeContact}
