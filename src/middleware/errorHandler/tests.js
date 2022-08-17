const request = require('supertest')
const {Router} = require('express')
const errors = require('../../constants/errors')
const {InternalError, BadRequest} = require('../../apiErrors')
const {PREFIX} = require('../../config')
const {app} = require('../../app')
const errorHandler = require('./index')

const jsonParseErrorRoute = '/jsonparse'
const badRequestErrorRoute = '/badrequest'
const internalErrorRoute = '/intenalerror'
const unknownErrorRoute = '/unknownerror'

beforeAll(() => {
    const router = Router()
    router.get(jsonParseErrorRoute, () => {})
    router.get(badRequestErrorRoute, () => {
        throw new BadRequest()
    })
    router.get(internalErrorRoute, () => {
        throw new InternalError()
    })
    router.get(unknownErrorRoute, () => {
        throw new Error()
    })

    app.use('/', router)
    app.use(errorHandler)
})

describe('error: 400 bad request', () => {
    test('json parse error', async () => {
        const response = await request(app)
            .get(jsonParseErrorRoute)
            .send('{"invalid"}')
            .type('json')
        expect(response.status).toEqual(errors.BAD_REQUEST.httpCode)
        expect(response.body).toEqual({
            code: errors.BAD_REQUEST.code,
            error: errors.BAD_REQUEST.message
        })
    })
    test('bad request error', async () => {
        const response = await request(app).get(badRequestErrorRoute)
        expect(response.status).toEqual(errors.BAD_REQUEST.httpCode)
        expect(response.body).toEqual({
            code: errors.BAD_REQUEST.code,
            error: errors.BAD_REQUEST.message
        })
    })
})

describe('error: 404 not found', () => {
    test('non-existed route', async () => {
        const response = await request(app).post(`/${PREFIX}/some/route`)
        expect(response.status).toEqual(errors.NOT_FOUND.httpCode)
        expect(response.body).toEqual({
            code: errors.NOT_FOUND.code,
            error: errors.NOT_FOUND.message
        })
    })
})

describe('error: 500 internal error', () => {
    test('some error happened', async () => {
        const response = await request(app).get(unknownErrorRoute)
        expect(response.status).toEqual(errors.INTERNAL_ERROR.httpCode)
        expect(response.body).toEqual({
            code: errors.INTERNAL_ERROR.code,
            error: errors.INTERNAL_ERROR.message
        })
    })

    test('internal error happened', async () => {
        const response = await request(app).get(internalErrorRoute)
        expect(response.status).toEqual(errors.INTERNAL_ERROR.httpCode)
        expect(response.body).toEqual({
            code: errors.INTERNAL_ERROR.code,
            error: errors.INTERNAL_ERROR.message
        })
    })
})

