const express = require('express');
const router = express.Router();
const Sequelize = require('../db');
var Power = Sequelize.import('../models/powers');
const validateSession = require('../middleware/validate-session')

router.post('/create', (req,res) => {
    Power.create({
    name: req.body.power.name,
    tags: req.body.power.tags,
    description: req.body.power.description
    })
    .then(
        createSuccess = (power) => {
            res.json({
                power: power,
                message: 'power created',
                
            })
        },
        createError = err => res.status(500).send(err)
    )
});

router.get('/', (req, res) => {
    Power.findAll()
        .then(power => res.status(200).json(power))
        .catch(error => res.status(500).json(error))
});


router.get('/:id', (req, res) => {
    Power.findOne({ where: { id: req.params.id }})
    .then(power => res.status(200).json(power))
    .catch(err => res.status(500).json({error: err}))
})

router.put('/:id', (req, res) => {
    if(!req.errors) {
        Power.update(req.body, { where: {id: req.params.id }})
        .then(power => res.status(200).json(power))
        .catch( err => res.status(500).json(req.errors))
    } else {
        res.status(500).json(req.error)
    }
})

router.delete('/:id', (req, res) => {
    if (!req.errors) {
        Power.destroy({ where: { id: req.params.id }})
        .then( power => res.status(200).json(power))
        .catch(err => res.json(req.errors))
    } else {
        res.status(500).json(req.errors)
    }
})

module.exports = router;