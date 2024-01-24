const express = require('express');
const router = express.Router();
const { Stage, Event, Stage_Event } = require('../models'); 

// Index route (list all stages with associated events)
router.get('/', async (req, res) => {
  try {
    const stages = await Stage.findAll({
      include: [
        {
          model: Event, 
          as: 'event',
          include: [
            {
              model: Stage_Event, 
              as: 'stageEvents'
            }
          ]
        }
      ]
    });
    res.status(200).json(stages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;



// Show route (get a specific stage by ID)
router.get('/:id', async (req, res) => {
  try {
    const stage = await Stage.findByPk(req.params.id, {
      include: [
        {
          model: Stage_Event, 
          as: 'stageEvents',
          include: [
            {
              model: Event, 
              as: 'event'
            }
          ]
        }
      ]
    });
    if (!stage) {
      res.status(404).json({ message: 'Stage not found.' });
    } else {
      res.status(200).json(stage);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Create route (create a new stage)
router.post('/', async (req, res) => {
    console.log(req.body); // Good for debugging
    try {
        const newStage = await Stage.create(req.body);
        res.status(201).json(newStage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});


// Update route (update an existing stage by ID)
router.put('/:id', async (req, res) => {
  try {
    const stage = await Stage.findByPk(req.params.id);
    if (!stage) {
      res.status(404).json({ message: 'Stage not found.' });
    } else {
      await stage.update(req.body);
      res.status(200).json(stage);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Delete route (delete a stage by ID)
router.delete('/:id', async (req, res) => {
  try {
    const stage = await Stage.findByPk(req.params.id);
    if (!stage) {
      res.status(404).json({ message: 'Stage not found.' });
    } else {
      await stage.destroy();
      res.status(204).send();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
