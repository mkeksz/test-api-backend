const request = require('supertest')
const {FORBIDDEN, OK, BAD_REQUEST} = require('../../constants/httpCodes')
const {AUTH_PATH} = require('../constants')
const {app} = require('../../app')
const {PREFIX} = require('../../config')
const {AUTH} = require('../../config')

const query = `?username=${AUTH.USERNAME}&password=${AUTH.PASSWORD}`
const authPath = `/${PREFIX}/${AUTH_PATH}`
const authPathWithQuery = `${authPath}${query}`

describe(`GET ${AUTH_PATH}`, () => {
    test('should return OK', async () => {
        const {status} = await request(app).get(authPathWithQuery)
        expect(status).toBe(OK)
    })
    test('should return Authorization header', async () => {
        const {header} = await request(app).get(authPathWithQuery)
        expect(header['authorization']).toMatch(/^Bearer (\S+\.\S+\.\S+)$/)
    })
    test('should return FORBIDDEN', async () => {
        const invalidQuery = '?username=invalid-name&password=invalid-password'
        const {status} = await request(app).get(authPath + invalidQuery)
        expect(status).toBe(FORBIDDEN)
    })
    test('should return BAD_REQUEST', async () => {
        const {status} = await request(app).get(authPath)
        expect(status).toBe(BAD_REQUEST)
    })
})
