// DEPENDENCIES
const express = require('express')
const app = express()
const bandsRouter = require('./controllers/bandcontroller');
const eventsRouter = require('./controllers/eventController');
const stagesRouter = require('./controllers/stageController');
require('dotenv').config()

// CONFIGURATION / MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use('/bands', bandsRouter);
app.use('/events', eventsRouter);
app.use('/stages', stagesRouter);


// ROOT
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Tour API'
    })
})

// LISTEN
app.listen(process.env.PORT, () => {
    console.log(`🎸 Rockin' on port: ${process.env.PORT}`)
})
