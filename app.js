require("dotenv").config({ path: ".env"});

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
const connection = require("./models/connection")

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const tripsRouter = require("./routes/trips");
const cartRouter = require("./routes/cart");

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000);
app.use('/', indexRouter);
app.use('/trips', tripsRouter);
app.use('/cart', cartRouter);
// app.use('/users', usersRouter);

module.exports = app;
