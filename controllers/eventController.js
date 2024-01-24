const express = require('express');
const router = express.Router();
const { Event,Meet_Greet, Band } = require('../models');

// Index route (list all events)
router.get('/', async (req, res) => {
  try {
    const events = await Event.findAll({
      order: [['date', 'ASC']],
      include: [{
        model: Meet_Greet,
        as: 'meetAndGreet', // Use the alias defined in the association
        include: [{
          model: Band,
          as: 'band' // Assuming you want to include Band details
        }]
      }]
    });
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});


// Show route (get a specific event by ID)
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      res.status(404).json({ message: 'Event not found.' });
    } else {
      res.status(200).json(event);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Create route (create a new event)
router.post('/', async (req, res) => {
  try {
    const newEvent = await Event.create(req.body);
    res.status(201).json(newEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Update route (update an existing event by ID)
router.put('/:id', async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      res.status(404).json({ message: 'Event not found.' });
    } else {
      await event.update(req.body);
      res.status(200).json(event);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Delete route (delete an event by ID)
router.delete('/:id', async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      res.status(404).json({ message: 'Event not found.' });
    } else {
      await event.destroy();
      res.status(204).send();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
