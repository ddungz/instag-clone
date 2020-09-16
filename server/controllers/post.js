const mongoose = require('mongoose')
const Post = mongoose.model('Post')

module.exports = {
    all(req, res) {
        Post.find().populate('postedBy', '_id name')
        .then(posts => {
            res.json({
                success: true, message: null, posts
            })
        }).catch(err => {
            console.log(err)
        })
    },
    store(req, res) {
        const { title, body, url } = req.body
        console.log(title, body, url)
        if(!title || !body || !url) res.status(422).json({ success: false, message: 'Please add all the fields' })

        req.user.password = undefined // we should not show the author's password of the post
        const post = new Post({ title, body, postedBy: req.user })
        post.save().then(posted => {
            res.json({
                success: true, message: 'Post added successfully',
                post: posted
            })
        }).catch(err => {
            console.log(err)
        })
    },
    myposts(req, res) {
        Post.find({ postedBy: req.user._id })
        .populate('postedBy', '_id name')
        .then(myposts => {
            res.json({
                success: true, message: null, myposts
            })
        })
    }
};
