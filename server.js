var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var cookieParser  = require('cookie-parser');
var session       = require('express-session');

console.log("secret");
console.log(process.env.PASSPORT_SECRET);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: process.env.PASSPORT_SECRET }));
app.use(cookieParser())

require("./public/assignment/server/app.js")(app);

app.get('/hello', function(req, res){
    res.send('hello world');
});
app.listen(port, ipaddress);