const Logger = require('./Logger')

module.exports = callingModule => new Logger(callingModule)
