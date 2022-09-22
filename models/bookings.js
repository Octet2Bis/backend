const mongoose = require('mongoose');
 
const bookingSchema = mongoose.Schema({
    departure: String,
    arrival: String,
    date: String,
    price: Number,
});
 
const booking = mongoose.model('bookings', bookingSchema);
 
module.exports = booking;