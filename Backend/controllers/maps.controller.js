const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service');


module.exports.getCoordinates = async (req, res) => {
    const  errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { address } = req.query;

    try {
        const coordinates = await mapService.getAddressCoordinate(address);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports.getDistanceAndTime = async (req, res) => {
    
    try{
        const  errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } 
    const { origin, destination } = req.query;
        const distanceTime = await mapService.getDistanceAndTime(origin, destination);
        return res.status(200).json(distanceTime);
    }catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports.getSuggestions = async (req, res) => {
    const  errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { input } = req.query;

    try {
        const suggestions = await mapService.getSuggestions(input);
        return res.status(200).json(suggestions);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
