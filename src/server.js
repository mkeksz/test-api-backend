const http = require('http')
const config = require('./config')
const logger = require('./services/logger')(module)
const {app} = require('./app')

function startServer() {
    http.createServer(app).listen(config.PORT, () => {
        logger.info(`App has been started on port ${config.PORT}...`)
    })
}

module.exports = {startServer}

