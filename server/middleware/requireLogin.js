const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const {JWT_SECRET, AUTH_TOKEN, AUTH_TOKEN_PREFIX} = require('../constants')

module.exports = (req, res, next) => {
    const authorization = req.headers[AUTH_TOKEN]
    if(!authorization) return res.status(401).json({success: false, message: 'You must be logged in'})
    
    const token = authorization.replace(AUTH_TOKEN_PREFIX, "")
    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if(err) return res.status(401).json({success: false, message: 'You must be logged in'})
        const {_id} = payload
        User.findById(_id).then(user => {
            req.user = user
            next()
        })
    })
}