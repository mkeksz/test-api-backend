const path = require('path')

const config = {}

config.PORT = 3000
config.PREFIX = 'v1'
config.URL = 'http://localhost:3000'
config.DB_URL = 'mongodb://localhost:27017/test'

config.ENV = {
    DEV: process.env.NODE_ENV === 'dev',
    PROD: process.env.NODE_ENV === 'production',
    TEST: process.env.NODE_ENV === 'test'
}

config.LOG = {
    ERROR_FILE: path.resolve('logs/errors.log'),
    COMBINED_FILE: path.resolve('logs/combined.log'),
    CONSOLE: config.ENV.DEV || config.ENV.TEST,
    DEBUG: config.ENV.DEV || config.ENV.TEST
}

config.CORS = {
    credentials: true,
    origin: true,
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['X-Total-Count', 'Content-Type', 'Authorization']
}

config.JWT = {
    SECRET_KEY: 'secret-key',
    TTL: '1d',
    SIGN: {
        ISSUER: 'Test Backend Application'
    }
}

config.AUTH = {
    USERNAME: 'admin',
    PASSWORD: '1234'
}

module.exports = config

