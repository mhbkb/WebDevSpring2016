var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
// install and require the mongoose library
var mongoose      = require('mongoose');

// create a default connection string
var connectionString = 'mongodb://127.0.0.1:27017/webassignment';

// use remote connection string
// if running in remote server
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

// connect to the database
var db = mongoose.connect(connectionString);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: process.env.PASSPORT_SECRET }));
app.use(cookieParser())

require("./public/assignment/server/app.js")(app, db);
require("./public/project/server/app.js")(app, db);

app.listen(port, ipaddress);