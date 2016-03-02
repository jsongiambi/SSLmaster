var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
// var m = require('./model.js');
var mongoose = require("mongoose");

mongoose.connect('mongodb://master:Ibookg41234@ds019068.mlab.com:19068/ssl');

var pgShareSchema = mongoose.Schema({
     share: String,
     page: String,
     count: Number
});

var pgShare = mongoose.model("pgshare", pgShareSchema);

var app = express();

app.set('port', process.env.PORT);

app.use(bodyParser.json());

app.use(express.static('client'));

app.get('/', function(req, res) {
    res.sendfile(path.join(__dirname + '/client/index.html'));
});

app.post('/process', function(req, res) {
    console.log(req.body);
   var o = {};
   o.map = function () { emit(this.share, this.count) }
   o.reduce = function (key, vals) { return Array.sum( vals ) }
  o.query = { page: req.body.input }
   pgShare.mapReduce(o, function (err, results) {
       if (err) console.error(err);
       res.json(results.sort(function (a, b) {
            return parseFloat(b.value) - parseFloat(a.value);
        }));
   });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Express started");
});
