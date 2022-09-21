// require("../models/connection")

var express = require('express');
var router = express.Router();
const Trips = require("../models/trips")
var moment = require('moment');


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
  
  const inputDate = req.body.date;

  Trips.find({
    departure: inputDep, 
    arrival: inputArr, 
    // date: inputDate
    })
    .then(matchingDateTrips => {
      // turn matching trips' date into string, then compare it with inputDate (which is as string)
        const found = matchingDateTrips.filter(trips => moment(trips.date).format("DD/MM/YYYY") === inputDate)
        console.log(found.length);
        if (found == 0) {
          // matching trips not found
          res.json({
            error: true,
            msg: "Not found."
          })
        } else {
          // matching trips found
          res.json({found})
        }

      // if(matchingTrips.length > 0) {
      //   // if matching trips have been found, display them
      //   res.json({matchingTrips})
      // } else {
      //   // else, display error "Not found"
      //   res.json({error: "Not found"})
      // }
      })
});

module.exports = router;
