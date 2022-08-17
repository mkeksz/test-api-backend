const {startServer} = require('./server')
const logger = require('./services/logger')(module)
const {testDatabase} = require('./services/database')

testDatabase.connect().then(startServer)

const signals = ['SIGINT', 'SIGTERM', 'SIGQUIT']
signals.forEach(signal =>
    process.on(signal, async () => {
        logger.info(`Caught signal ${signal}`)
        await testDatabase.disconnect()
        process.exit(0)
    })
)

process.on('uncaughtException', async error => {
    logger.error(error)
    process.exit(1)
})

