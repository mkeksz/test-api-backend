const {Router} = require('express')
const {NotFound} = require('../apiErrors')
const {AUTH_PATH, CONTACTS_PATH, COMPANIES_PATH} = require('./constants')
const authRouter = require('./auth')
const contactsRouter = require('./contacts')
const companiesRouter = require('./companies')

const router = Router()

router.use(AUTH_PATH, authRouter)
router.use(CONTACTS_PATH, contactsRouter)
router.use(COMPANIES_PATH, companiesRouter)
router.use(() => {
    throw new NotFound()
})

module.exports = router
