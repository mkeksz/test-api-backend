const {PREFIX} = require('../../config')
const {CONTACTS_PATH} = require('../constants')
const onlyAuthorized = require('../../middleware/onlyAuthorized')
const {OK, BAD_REQUEST, NOT_FOUND} = require('../../constants/httpCodes')
const errors = require('../../constants/errors')
const request = require('supertest')
const {app} = require('../../app')
const {testDB} = require('../../services/database')
const {contact} = require('./tests.data')
const validatorErrors = require('./validator.errors')
const testDBConnection = require('../../mongo/testDB')
const {getMongoIDError} = require('../../middleware/isMongoID')

const postContactsPath = `/${PREFIX}${CONTACTS_PATH}`
const getContactsPath = `${postContactsPath}/`

jest.mock('../../middleware/onlyAuthorized')

beforeAll(async () => {
    await testDB.connect()
    onlyAuthorized.mockImplementation((req, res, next) => next())
})

afterAll(async () => {
    jest.resetAllMocks()
    await testDB.disconnect()
})

describe(`POST ${CONTACTS_PATH}`, () => {
    afterAll(async () => {
        const {Contact} = testDBConnection().models
        await Contact.deleteMany()
    })

    describe('success', () => {
        let status, body
        beforeAll(async () => {
            const result = await request(app).post(postContactsPath).send(contact)
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
            _request = request(app).post(postContactsPath)
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

describe(`GET ${CONTACTS_PATH}/:id`, () => {
    let contactID
    beforeAll(async () => {
        const {Contact} = testDBConnection().models
        const contactDB = await Contact.insertMany([contact])
        contactID = contactDB[0]._id.toString()
    })

    afterAll(async () => {
        const {Contact} = testDBConnection().models
        await Contact.deleteMany()
    })

    describe('success', () => {
        let status, body
        beforeAll(async () => {
            const result = await request(app).get(`${getContactsPath}${contactID}`)
            status = result.status
            body = result.body
        })

        test('should return OK', () => {
            expect(status).toBe(OK)
        })
        test('should return contact object', () => {
            expect(body).toEqual({...contact, id: contactID})
        })
    })

    describe('error', () => {
        test('should return BAD_REQUEST if id is not mongoID', async () => {
            const {status, body} = await request(app).get(`${getContactsPath}1234`)
            expect(status).toBe(BAD_REQUEST)
            expect(body).toEqual(getMongoIDError('id'))
        })

        test('should return NOT_FOUND if contact is not found', async () => {
            const fakeID = '630914329011e211ca989670'
            const {status, body} = await request(app).get(`${getContactsPath}${fakeID}`)
            expect(status).toBe(NOT_FOUND)
            expect(body).toEqual({code: errors.NOT_FOUND.code, error: errors.NOT_FOUND.message})
        })
    })
})
