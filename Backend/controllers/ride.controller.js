const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service');
const { sendMessagetoSocketId } = require('../socket');
const rideModel = require('../models/ride.model');
const socketModule = require('../socket');


module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId, pickup, destination, vehicleType } = req.body;

    try {
        const ride = await rideService.createRide({ user: req.user._id, pickup, destination, vehicleType });
        
        // Get pickup coordinates
        const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
        
        // Find captains in radius
        const captainsInRadius = await mapService.getCaptainsInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 2);
        
        // Populate user data safely
        let rideWithUser;
        try {
            rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');
        } catch (error) {
            console.error("Error populating user:", error);
            rideWithUser = ride; // Fallback to unpopulated ride
        }
        
        // Send notifications to captains
        if (captainsInRadius && captainsInRadius.length > 0) {
            captainsInRadius.forEach(captain => {
                if (captain && captain.socketId) {
                    sendMessagetoSocketId(captain.socketId, {
                        event: 'new-ride',
                        data: rideWithUser
                    });
                }
            });
        }
        
        // Send response only once
        return res.status(201).json(ride);

    } catch (err) {

        console.log(err);
        return res.status(500).json({ message: err.message });
    }

};

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;

    try {
        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;
    
    if (!rideId) {
        return res.status(400).json({ message: 'Ride ID is required' });
    }
    
    if (!req.captain || !req.captain._id) {
        return res.status(401).json({ message: 'Captain authentication failed' });
    }

    try {
        console.log(`Captain ${req.captain._id} confirming ride ${rideId}`);
        
        const ride = await rideService.confirmRide({ rideId, captain: req.captain });
        
        // Log the ride and user details
        console.log('Ride confirmed:', ride._id);
        console.log('User socketId:', ride.user?.socketId || 'Not available');
        
        // Always broadcast to all clients to ensure the message is received
        if (socketModule.io) {
            console.log('Broadcasting ride-confirmed to all clients');
            socketModule.io.emit('ride-confirmed', ride);
        }
        
        // Also try direct message if we have a socketId
        if (ride.user && ride.user.socketId) {
            console.log(`Sending direct message to socket ${ride.user.socketId}`);
            sendMessagetoSocketId(ride.user.socketId, {
                event: 'ride-confirmed',
                data: ride
            });
        } else {
            console.error('User has no socketId, relying on broadcast only');
        }

        return res.status(200).json(ride);
    } catch (err) {
        console.error('Error confirming ride:', err);
        return res.status(500).json({ message: err.message || 'Failed to confirm ride' });
    }
}

module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;

    try {
        if (!rideId || !otp) {
            return res.status(400).json({ message: 'Ride ID and OTP are required' });
        }

        const ride = await rideService.startRide({ rideId, otp, captain: req.captain });

        // Send notification to user that ride has started
        if (ride.user && ride.user.socketId) {
            sendMessagetoSocketId(ride.user.socketId, {
                event: 'ride-started',
                data: ride
            });
        }

        return res.status(200).json(ride);
    } catch (err) {
        console.error("Error starting ride:", err);
        
        if (err.message === 'Invalid OTP') {
            return res.status(400).json({ message: err.message });
        }
        
        return res.status(500).json({ message: err.message });
    }
}

module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.endRide({ rideId, captain: req.captain });

        sendMessagetoSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })



        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}