// require("../models/connection")

var express = require('express');
var router = express.Router();
const Cart = require("../models/cart")

// when user adds trip to cart, add it to cart db

router.get('/', function(req, res, next) {
  res.send("cart index");
});

router.get('/view', function(req, res) {
  Cart.find().then(cart => res.json({cart}))
});

router.post("/add", function(req, res) {
  // add trip to cart db
  const newTrip = new Cart({
    departure: req.body.departure,
    arrival: req.body.arrival,

    // TODO: convert date string into proper date
    date: req.body.date,
    // converts string to number
    price: parseInt(req.body.price),
  })
  newTrip.save().then(savedTrip => {if(savedTrip) {
    res.json({msg: `Trip ${req.body.departure} to ${req.body.arrival} added to cart`})
  } else {
    res.json({error: true, msg: `Unable to save trip`})
  }})
})

// remove request
// note: handle removing on the frontend with a delete button there
router.delete("/remove", (res, req) => {
  Cart.deleteOne({
    departure: req.body.departure,
    arrival: req.body.departure
  })
})

module.exports = router;
