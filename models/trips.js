const mongoose = require('mongoose');
 
const tripSchema = mongoose.Schema({
    departure: String,
    arrival: String,
    date: String,
    price: Number,
});
 
const trips = mongoose.model('trips', tripSchema);
 
module.exports = trips;