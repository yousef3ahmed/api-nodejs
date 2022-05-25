const { Trainer, validate } = require('../models/trainer');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    // First Validate The Request
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Check if this trainer already exisits
    let trainer = await trainer.findOne({ email: req.body.email });
    if (trainer) {
        return res.status(400).send('That trainer already exisits!');
    } else {
        // Insert the new trainer if they do not exist yet
        trainer = new Trainer({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        await trainer.save();
        res.send(trainer);
    }
});

module.exports = router;