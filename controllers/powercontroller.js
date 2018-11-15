const express = require('express');
const router = express.Router();
const Sequelize = require('../db');
var Power = Sequelize.import('../models/powers');
var User = Sequelize.import('../models/user');
const validateSession = require('../middleware/validate-session')

router.post('/create',validateSession, (req,res) => {
    if(!req.err){

    Power.create({
    owner: req.user.id,
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
    )}
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

router.put("/update/:id", function (req, res) {
    let powerID = req.params.id
    let name = req.body.power.name
    let tags = req.body.power.tags
    let description = req.body.power.description

    Power.update({
        name: name,
        tags: tags,
        description: description
    }, { where: { id: powerID } } )
        .then(
            function createUpdateSuccess(updatedPower) {
                res.status(200).json(updatedPower)
            },
            function createUpdateError(err) {
                res.send(500, err.message)
            }
        )
})


router.delete('/:id',validateSession, (req, res) => {
    if (!req.errors) {
        Power.destroy({ where: { id: req.params.id }})
        .then( power => res.status(200).json(power))
        .catch(err => res.json(req.errors))
    } else {
        res.status(500).json(req.errors)
    }
})

module.exports = router;