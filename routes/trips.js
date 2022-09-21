// require("../models/connection")

var express = require('express');
var router = express.Router();
const Trips = require("../models/trips")

router.get('/all', function(req, res) {
  // get all trips in the db
    Trips.find().then(alltrips => res.json({alltrips}))
  });

  // find trip with dep/arr
router.get("/finddeparr", function(req, res) {
  // find trips according to departure and arrival
  
  // first letter uppercase, rest lowercase (to be consistent with the db)
  const inputDep = req.body.departure.charAt(0).toUpperCase() +  req.body.departure.slice(1).toLowerCase();
  const inputArr = req.body.arrival.charAt(0).toUpperCase() +  req.body.arrival.slice(1).toLowerCase();

  Trips.find({departure: inputDep, arrival: inputArr})
    .then(matchingTrips => {
      if(matchingTrips.length > 0) {
        // if matching trips have been found, display them
        res.json({matchingTrips})
      } else {
        // else, display error "Not found"
        res.json({error: "Not found"})
      }
      })
});


// TODO: manage missing fields
router.get("/find", function(req, res) {
// find trips according to dep, arr and date

  // first letter uppercase, rest lowercase (to be consistent with the db)
  const inputDep = req.body.departure.charAt(0).toUpperCase() +  req.body.departure.slice(1).toLowerCase();
  const inputArr = req.body.arrival.charAt(0).toUpperCase() +  req.body.arrival.slice(1).toLowerCase();
  // TODO: turn a string date into date 
  const inputDate = new Date(req.body.date);

  Trips.find({departure: inputDep, arrival: inputArr, date: inputDate})
    .then(matchingTrips => {
      if(matchingTrips.length > 0) {
        // if matching trips have been found, display them
        res.json({matchingTrips})
      } else {
        // else, display error "Not found"
        res.json({error: "Not found"})
      }
      })
});

module.exports = router;
