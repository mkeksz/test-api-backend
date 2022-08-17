const express = require('express')
require('express-async-errors')
const cors = require('cors')
const httpContext = require('express-http-context')
const useragent = require('express-useragent')
const httpContextInitializer = require('./middleware/httpContextInitializer')
const debugLogger = require('./middleware/debugLogger')
const errorHandler = require('./middleware/errorHandler')
const {CORS, PREFIX} = require('./config')
const routes = require('./routes')

const app = express()

app.disable('x-powered-by')
app.enable('trust proxy')

app.use(useragent.express())

app.use(httpContext.middleware)
app.use(httpContextInitializer)

app.use(debugLogger)

app.use(cors(CORS))

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(`/${PREFIX}/`, routes)
app.use(errorHandler)

module.exports = {app}
