const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "First name must be at least 3 characters long"]
        },
        lastname: {
            type: String,
            minlength: [3, "Last name must be at least 3 characters long"]
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, "Email must be at least 5 characters long"]
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle: {
        color:{
            type: String,
            required: true,
            minlength: [3, "Color must be at least 3 characters long"]
        },
        plate:{
            type: String,
            required: true,
            minlength: [3, "Plate must be at least 3 characters long"]
        },
        capacity:{
            type: Number,
            required: true,
            min: [1, "Capacity must be at least 1"]
        },
        vehicleType:{
            type: String,
            required: true,
            enum: ['car', 'bike', 'auto'],
        }
    },
    location: {
       ltd: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    }
})

captainSchema.index({ location: '2dsphere' });

captainSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

captainSchema.methods.comparePassword = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
} 

captainSchema.statics.hashpassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

module.exports = mongoose.model('Captain', captainSchema);