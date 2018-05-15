var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var app = express();

const server = http.createServer(app);
require('./api-gateway_routes')(app, {});

app.listen(8801, function() {
    console.log('Api Gateway on happens on 8801');
});







