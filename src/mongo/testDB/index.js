const {testDB} = require('../../services/database')

module.exports = () => {
    const connection = testDB.connection
    connection.model('Contact', require('./models/contact'), 'contacts')
    connection.model('Company', require('./models/company'), 'companies')
    return connection
}
