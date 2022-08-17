const httpContext = require('express-http-context')

module.exports = (req, res, next) => {
    httpContext.ns.bindEmitter(req)
    httpContext.ns.bindEmitter(res)
    const proto = req.headers['x-forwarded-proto'] || req.socket.encrypted ? 'https' : 'http'
    const host = req.get('Host')
    const url = `${proto}://${host}`
    httpContext.set('url', url)
    httpContext.set('path', req?.url)
    httpContext.set('method', req?.method)
    next()
}
