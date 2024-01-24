const express = require('express');
const router = express.Router();
const { Band } = require('../models')
const { Op } = require('sequelize'); 


router.get('/', async (req, res) => {
    try {
        const foundBands = await Band.findAll({
            order: [['available_start_time', 'ASC']],
            where: {
                name: { [Op.iLike]: `%${req.query.name ? req.query.name : ''}%` }
            }
        });
        if (foundBands.length === 0) {
            res.status(404).json({ message: 'No bands found with the specified name.' });
        } else {
            res.status(200).json(foundBands);
        }
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        res.status(500).json({ message: 'Internal server error.' });
    }
});

router.post('/', async (req, res) => {
    try {
        const newBand = await Band.create(req.body);
        res.status(201).json(newBand);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const band = await Band.findByPk(req.params.id);
        if (!band) {
            return res.status(404).json({ message: 'Band not found.' });
        }
        await band.update(req.body);
        res.status(200).json(band);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const band = await Band.findByPk(req.params.id);
        if (!band) {
            return res.status(404).json({ message: 'Band not found.' });
        }
        await band.destroy();
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = router; 