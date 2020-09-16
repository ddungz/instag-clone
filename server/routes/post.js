const express = require('express')
const router = express.Router()
const requireLogin = require('../middleware/requireLogin')
const post = require('./../controllers/post')

router.get('/posts/all', post.all)
router.post('/posts/store', requireLogin, post.store)
router.get('/posts/myposts', requireLogin, post.myposts)

module.exports = router
