const axios = require('axios');
const captainModel = require('../models/captain.model')

module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

    try {
        const response = await axios.get(url);

        if (response.data.status === 'OK') {
            const location = response.data.results[ 0 ].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required.');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try{
        const response = await axios.get(url);

        if (response.data.status === 'OK') {
            if(response.data.rows[0].elements[0].status === 'ZERO_RESULTS') {
                throw new Error('No routes found')
            }
            return response.data.rows[0].elements[0];
        }else{
            throw new Error('Unable to fetch distance and time from Google Maps API');
        }

    }catch(error) {
        throw new Error(`Failed to fetch distance and time: ${error.message}`);
    }
}

module.exports.getSuggestions = async (input) => {
    if (!input) {
        throw new Error('Input is required for suggestions.');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const encodedInput = encodeURIComponent(input);
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodedInput}&key=${apiKey}`;

    try {
        const response = await axios.get(url);

        if (response.data.status === 'OK') {
            return response.data.predictions.map(prediction => prediction.description).filter(value=>value)
        }else{
            return new Error(`Google Maps API error: ${response.data.status}`);
        }

       
    } catch (error) {
        throw new Error(`Failed to fetch suggestions: ${error.message}`);
    }
}

module.exports.getCaptainsInTheRadius = async(ltd,lng,radius)=>{
    const captains = await captainModel.find({
        location:{
            $geoWithin:{
                $centerSphere:[[ltd,lng],radius/6371]
            }
        }
    })
    return captains
}

