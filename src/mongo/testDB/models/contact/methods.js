const connection = require('../../index')

async function getByID(id) {
    const {Contact} = connection().models
    return Contact.findById(id)
}

module.exports = {getByID}
