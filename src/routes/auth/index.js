const {Router} = require('express')
const {get} = require('./controller')
const validator = require('./validator')

const router = Router()

router.get('/', ...validator, get)

module.exports = router
