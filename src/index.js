const {startServer} = require('./server')
const logger = require('./services/logger')(module)
const {testDB} = require('./services/database')

testDB.connect().then(startServer)

const signals = ['SIGINT', 'SIGTERM', 'SIGQUIT']
signals.forEach(signal =>
    process.on(signal, async () => {
        logger.info(`Caught signal ${signal}`)
        await testDB.disconnect()
        process.exit(0)
    })
)

process.on('uncaughtException', async error => {
    logger.error(error)
    process.exit(1)
})

