const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = mongoose.model('User')
const { JWT_SECRET, JWT_TTL } = require('../constants')

module.exports = {
    signup(req, res) {
        const { name, email, password } = req.body
        if(!name || !email || !password) return res.status(422).json({ success: false, message: 'Please fill all the fields' })

        const save = function(user) {
            user.save()
                .then((saved) => {
                    console.log('We just have new user', saved)
                    return res.json({
                        success: true,
                        message: 'User saved successfully',
                        user: saved
                    })
                })
                .catch((err) => {
                    console.log(err)
                    return res.status(500).json({ success: false, message: 'Cannot save user' })
                })
        }

        User.findOne({email: email})
            .then((dbUser) => {
                if(dbUser) {
                    let msg = `User with email ${email} is already existed`
                    console.log(msg)
                    return res.status(422).json({ success: false, message: msg })
                }

                bcrypt.hash(password, 12).then(hashed => {
                    // save user
                    save(new User({ name, email, password: hashed }))
                }).catch((err) => {
                    console.log(err)
                    return res.status(500).json({ message: 'Failed to hash the password' })
                })
            }).catch((err) => {
                console.log(err)
                return res.status(500).json({ success: false, message: 'Cannot save user' })
            })
    },
    signin(req, res) {
        const { email, password } = req.body
        if(!email || !password) return res.status(422).json({ success: false, message: 'Please enter both email or password' })

        User.findOne({ email: email })
            .then(user => {
                if(!user) return res.status(422).json({ success: false, message: 'Invalid email or password' })

                bcrypt.compare(password, user.password).then(matched => {
                    if(matched) {
                        let {_id, email, name} = user;
                        let payload = { _id: user._id }
                        const token = jwt.sign(
                            payload,
                            JWT_SECRET,
                            { expiresIn: JWT_TTL }
                        )

                        return res.json({
                            success: true,
                            message: 'Successfully logged in',
                            token,
                            user: {_id, email, name}
                        })
                    }
                    return res.status(422).json({ success: false, message: 'Invalid email or password' })
                })
                .catch(err => {
                    console.log(err)
                    return res.status(500).json({ success: false, message: 'Failed to login' })
                })
            }).catch((err) => {
                console.log(err)
                return res.status(500).json({ success: false, message: 'Cannot login' })
            })
    }
};
