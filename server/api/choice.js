const router = require('express').Router()
const { User, Choice } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
    Choice.findAll()
    .then(choices => res.json(choices))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
    Choice.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(choices => res.json(choices))
    .catch(next)
})

router.post('/:id', (req, res, next) => {
    // User.findById(req.params.userId)
    //     .then(user => user.getChoice())
    //     .then(choices => {
    //         return Choice.create({...req.body}, {userId: req.params.userId})
    //     })
    //     .then(choices => res.json(choices))
    //     .catch(next)
    Choice.create(req.body)
    .then(choices => res.json(choices))
    .catch(next)     
})