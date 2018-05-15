var express = require('express');
var mongoose   = require('mongoose');

var app = express();

require('./conditions')(app, {});


var promise = mongoose.connect('mongodb://127.0.0.1:27017', {
    useMongoClient: true,

});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(8803, function() {
    console.log('TextService listening on 8803');
});