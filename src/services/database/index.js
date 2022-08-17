const Database = require('./Database')
const {DB_URL} = require('../../config')

class TestDatabase extends Database {
    constructor(uri) {
        super(uri)
        this.name = 'test_db'
    }
}

module.exports = {testDatabase: new TestDatabase(DB_URL)}
