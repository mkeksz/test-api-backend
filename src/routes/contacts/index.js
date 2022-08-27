const {Router} = require('express')
const onlyAuthorized = require('../../middleware/onlyAuthorized')
const {post, get} = require('./controller')
const validator = require('./validator')
const {isMongoId} = require('../../middleware/isMongoID')

const router = Router()

router.use(onlyAuthorized)

router.get('/:id', ...isMongoId(['id']), get)
router.put('/:id', (req, res) => res.send('Hello World!'))
router.delete('/:id', (req, res) => res.send('Hello World!'))
router.post('/', ...validator, post)

module.exports = router
