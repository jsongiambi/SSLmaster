var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var m = require('./model.js');

var app = express();

app.set('port', process.env.PORT);

app.use(bodyParser.json());

app.use(express.static('client'));

app.get('/', function(req, res) {
    res.sendfile(path.join(__dirname + '/client/index.html'));
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Express started");
});
