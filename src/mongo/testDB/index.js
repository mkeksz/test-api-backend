const {connection} = require('../../services/database').testDB

function connectionFactory() {
    connection.model('Contact', require('./models/contact'), 'contacts')
    connection.model('Company', require('./models/company'), 'companies')
    return connection
}

module.exports = connectionFactory
