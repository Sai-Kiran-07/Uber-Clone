const socketIo = require('socket.io');
const userModel = require('./models/user.model')
const captainModel = require('./models/captain.model')

let io;
function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });
    
    // Export io for use in other modules
    module.exports.io = io;

    io.on('connection', (socket) => {
        console.log(`New client connected: ${socket.id}`);

        socket.on('join', async(data) => {
            try {
                const {userId, userType} = data
                
                if (!userId) {
                    return socket.emit('error', {message: 'User ID is required'});
                }

                if(userType === 'user'){
                    await userModel.findByIdAndUpdate(userId, {
                        socketId: socket.id
                    });
                    console.log(`User ${userId} joined with socket ${socket.id}`);
                } else if(userType === 'captain'){
                    await captainModel.findByIdAndUpdate(userId, {
                        socketId: socket.id
                    });
                    console.log(`Captain ${userId} joined with socket ${socket.id}`);
                }
            } catch (error) {
                console.error('Error in join event:', error);
                socket.emit('error', {message: 'Server error during join'});
            }
        });

        socket.on('update-location-captain', async(data) => {
            try {
                const {userId, location} = data

                if(!userId) {
                    return socket.emit('error', {message: 'User ID is required'});
                }

                if(!location || !location.ltd || !location.lng){
                    return socket.emit('error', {message: 'Invalid location data'});
                }
                
                await captainModel.findByIdAndUpdate(userId, {
                    location: {
                        ltd: location.ltd,
                        lng: location.lng
                    }
                });
            } catch (error) {
                console.error('Error updating location:', error);
                socket.emit('error', {message: 'Server error updating location'});
            }
        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}


function sendMessagetoSocketId(socketId, messageObject){
    if (!socketId) {
        console.error('No socketId provided for message:', messageObject);
        return;
    }
    
    if (io) {
        console.log(`Sending ${messageObject.event} to socket ${socketId}`);
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log('Socket.io not initialized.');
    }
}

module.exports  = {
    initializeSocket,
    sendMessagetoSocketId
};