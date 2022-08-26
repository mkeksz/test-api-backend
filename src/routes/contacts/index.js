const {Router} = require('express')
const onlyAuthorized = require('../../middleware/onlyAuthorized')
const {post} = require('./controller')
const validator = require('./validator')

const router = Router()

router.use(onlyAuthorized)

router.get('/', (req, res) => res.send('Hello World!'))
router.post('', ...validator, post)

module.exports = router
