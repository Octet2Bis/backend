// require("../models/connection")

var express = require('express');
var router = express.Router();
const Bookings = require("../models/bookings")

// when user adds trip to bookings, add it to bookings db

router.get('/', function(req, res, next) {
  res.send("bookings index");
});

router.get('/view', function(req, res) {
  Bookings.find().then(bookings => res.json({bookings}))
});

router.post("/add", function(req, res) {
  // add trip to bookings db
  const newTrip = new Bookings({
    departure: req.body.departure,
    arrival: req.body.arrival,

    // TODO: convert date string into proper date
    date: req.body.date,
    // converts string to number
    price: parseInt(req.body.price),
  })
  newTrip.save().then(savedTrip => {
    if(savedTrip) {
    res.json({msg: `Trip ${req.body.departure} to ${req.body.arrival} added to bookings`})
    } else {
    res.json({error: true, msg: `Unable to save trip`})
  }})
})

// remove request
// note: handle removing on the frontend with a delete button there
router.delete("/remove", (req, res) => {
  Bookings.deleteOne({
    departure: req.body.departure,
    arrival: req.body.arrival,
    date: req.body.date,
    price: parseInt(req.body.price),
  }).then(
    removedTrip => {
      if (removedTrip.deletedCount > 0) {
        res.json({msg: `Trip ${req.body.departure} to ${req.body.arrival} removed from bookings`})
      } else {
        res.json({error: true, msg: `Unable to find trip`})
      }
    }
  )
})

module.exports = router;
