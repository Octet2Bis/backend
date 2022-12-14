const mongoose = require('mongoose');
 
const tripSchema = mongoose.Schema({
    departure: String,
    arrival: String,
    date: Date,
    price: Number,
});
 
const trips = mongoose.model('trips', tripSchema);
 
module.exports = trips;