const {PREFIX} = require('../../config')
const {CONTACTS_PATH} = require('../constants')
const onlyAuthorized = require('../../middleware/onlyAuthorized')
const {OK, BAD_REQUEST} = require('../../constants/httpCodes')
const errors = require('../../constants/errors')
const request = require('supertest')
const {app} = require('../../app')
const {testDB} = require('../../services/database')
const {contact} = require('./tests.data')
const validatorErrors = require('./validator.errors')

const contactsPath = `/${PREFIX}${CONTACTS_PATH}`

jest.mock('../../middleware/onlyAuthorized')

describe(`POST ${CONTACTS_PATH}`, () => {
    beforeAll(async () => {
        onlyAuthorized.mockImplementation((req, res, next) => next())
        await testDB.connect()
    })

    afterAll(async () => {
        jest.resetAllMocks()
        await testDB.disconnect()
    })

    describe('success', () => {
        let status, body
        beforeAll(async () => {
            const result = await request(app).post(contactsPath).send(contact)
            status = result.status
            body = result.body
        })

        test('should return OK', () => {
            expect(status).toBe(OK)
        })
        test('should return contact object', () => {
            expect(typeof body.id).toBe('string')
            expect(body).toEqual({...contact, id: body.id})
        })
    })

    describe('error', () => {
        const badRequestCode = errors.BAD_REQUEST.code
        let _request
        beforeEach(() => {
            _request = request(app).post(contactsPath)
        })

        test('should return BAD_REQUEST if firstname is empty', async () => {
            const {status, body} = await _request.send({...contact, firstname: undefined})
            expect(status).toBe(BAD_REQUEST)
            expect(body)
                .toEqual({...validatorErrors.FIRSTNAME_REQUIRED, code: badRequestCode})
        })

        test('should return BAD_REQUEST if lastname is empty', async () => {
            const {status, body} = await _request.send({...contact, lastname: undefined})
            expect(status).toBe(BAD_REQUEST)
            expect(body)
                .toEqual({...validatorErrors.LASTNAME_REQUIRED, code: badRequestCode})
        })

        test('should return BAD_REQUEST if patronymic is empty', async () => {
            const {status, body} = await _request.send({...contact, patronymic: undefined})
            expect(status).toBe(BAD_REQUEST)
            expect(body)
                .toEqual({...validatorErrors.PATRONYMIC_REQUIRED, code: badRequestCode})
        })

        test('should return BAD_REQUEST if phone is empty', async () => {
            const {status, body} = await _request.send({...contact, phone: undefined})
            expect(status).toBe(BAD_REQUEST)
            expect(body)
                .toEqual({...validatorErrors.PHONE_REQUIRED, code: badRequestCode})
        })

        test('should return BAD_REQUEST if phone is invalid', async () => {
            const {status, body} = await _request.send({...contact, phone: 'phone'})
            expect(status).toBe(BAD_REQUEST)
            expect(body)
                .toEqual({...validatorErrors.PHONE_INVALID, code: badRequestCode})
        })

        test('should return BAD_REQUEST if email is empty', async () => {
            const {status, body} = await _request.send({...contact, email: undefined})
            expect(status).toBe(BAD_REQUEST)
            expect(body)
                .toEqual({...validatorErrors.EMAIL_REQUIRED, code: badRequestCode})
        })

        test('should return BAD_REQUEST if email is invalid', async () => {
            const {status, body} = await _request.send({...contact, email: 'email'})
            expect(status).toBe(BAD_REQUEST)
            expect(body)
                .toEqual({...validatorErrors.EMAIL_INVALID, code: badRequestCode})
        })
    })
})
