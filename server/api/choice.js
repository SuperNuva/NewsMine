const router = require('express').Router()
const { User, Choice } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
    Choice.findAll()
    .then(choices => res.json(choices))
    .catch(next)
})

router.get('/users/:userId', (req, res, next) => {
    Choice.findOne({
        where: {
            userId: req.params.userId
        }
    })
    .then(choices => res.json(choices))
    .catch(next)
})

router.post('/users/:userId', (req, res, next) => {
    Choice.create(req.body, {
        where: {
            userId: req.params.userId
        }
    })
    .then(choices => res.json(choices))
    .catch(next)     
})

router.put('/users/:userId', (req, res, next) => {
    Choice.update(req.body, {
        where: {
            userId: req.params.userId
        }
    })
    .then(choices => res.json(choices))
    .catch(next)     
})