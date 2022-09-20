// require("dotenv").config();
 
const mongoose = require('mongoose');
 

const connectionString = process.env.CONSTR;

mongoose.connect(connectionString, {connectTimeoutMS: 2000})
    .then(() => console.log('Database tickethack connected'))
    .catch(error => console.error(error));