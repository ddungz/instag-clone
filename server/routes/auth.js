const express = require('express')
const router = express.Router()
const requireLogin = require('../middleware/requireLogin')
const auth = require('./../controllers/auth')

router.get('/protected', requireLogin, (req, res) => {
    res.json({message: 'ok'})
})

router.get('/', (req, res) => {
    res.send('Hello')
})

router.post('/signup', auth.signup)
router.post('/signin', auth.signin)

module.exports = router
