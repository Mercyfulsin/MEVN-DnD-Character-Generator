const express = require('express');
const router = express.Router();
const Character = require('../models/character');

router.get('/', async (req, res) => {
    try {
        const characters = await Character.find();
        res.json(characters);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const character = new Character({
        name: req.body.name,
        job: req.body.job
    });
    try {
        const newCharacter = await character.save();
        res.status(201).json(newCharacter);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/', async (req, res) => {
    try {
        Character.deleteOne({_id: req.body._id},function(err, result) {
            console.log("Result: ", result);
            !err ? res.status(201).json(result) :  res.status(400).json({ DeleteMessage: err.message });
        });
    } catch (err) {
       res.status(400).json({RequestError: err.message});
    }
})


module.exports = router;