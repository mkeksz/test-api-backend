const env = process.env.NODE_ENV || 'global'
// eslint-disable-next-line security/detect-non-literal-require
const config = require(`./config.${env}`)

module.exports = config
