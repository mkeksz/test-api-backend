const connection = require('../../index')

async function getByID(id) {
    const {Company} = connection().models
    return Company.findById(id)
}

module.exports = {getByID}
