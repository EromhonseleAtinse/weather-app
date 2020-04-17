const express = require('express');
const router = express.Router();

const Weather = require('../models/weather')


router.get('/:city', (req, res) => {
    let city = req.params.city
    Weather.retrieveByCity(city, (err, weather) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json(weather)
        }
    })
})

module.exports = router