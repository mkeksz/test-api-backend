const mongoose = require('mongoose/index')
const logger = require('../logger')(module)

class Database {
    constructor(uri) {
        this.uri = uri
        this.name = null
        this.connection = null
    }

    async connect() {
        if (this.connection) return
        try {
            logger.info(`Connecting to ${this.name}...`)
            this.connection = await mongoose.createConnection(this.uri).asPromise()
            logger.info(`Connected to ${this.name}`)
            this._setEventHandlersToConnection()
        } catch (error) {
            logger.error(`${error.message}`)
            throw error
        }
    }

    async disconnect() {
        if (!this.connection) return
        try {
            await this.connection.close()
        } catch (error) {
            logger.error(`${error.message}`)
            throw error
        }
    }

    _setEventHandlersToConnection() {
        this.connection.on('disconnected', () => logger.info(`Disconnected from ${this.name}`))
        this.connection.on('close', () => logger.info(`Closed connection to ${this.name}`))
        this.connection.on('reconnected', () => logger.info(`Reconnected to ${this.name}`))
        this.connection.on('error', error => logger.error(error.message))
    }
}

module.exports = Database
