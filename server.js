"use strict";

// setup
var port = 8080;

var express = require('express');
var app = express();
var mongoose = require('mongoose');


// config
mongoose.connect('localhost');

app.configure(function() {
    app.use(express.static(__dirname + '/public'));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
});


// start
app.listen(port);
console.log();
console.log('Starting on port: ' + port);
