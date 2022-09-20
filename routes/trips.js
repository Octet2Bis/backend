require("../models/connection")

var express = require('express');
var router = express.Router();
const Trips = require("../models/trips")

router.get('/all', function(req, res) {
    Trips.find().then(alltrips => res.send(alltrips))
  });

// router.get("/find", function(req, res) {

// });


module.exports = router;
