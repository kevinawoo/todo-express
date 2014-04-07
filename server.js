"use strict";

// setup
var config = {
    port: 8080
};

var express = require('express');
var app = express();
var mongoose = require('mongoose');


// configuration
mongoose.connect('mongodb://127.0.0.1/todo');

app.configure(function() {
    app.use(express.static(__dirname + '/public'));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
});



// routes

    // application
    app.get('/', function (req, res) {
        res.sendfile('./public/index.html');
    });


    // create
    app.post('/todo/create', function (req, res) {

        console.log('creating: ' + req.body.text);

        Todo.create({
            text: req.body.text,
            done: false
        }, function (err, todo) {
            if (err){
                res.send(err);
            }

            
            Todo.find(function(err, todo) {
                if (err) {
                    res.send(err);
                }

                res.json(todo);
            });

        });

    });

    // read
    app.get('/todo/read', function(req, res) {

        console.log('reading');

        Todo.find(function(err, todo) {
            if (err) {
                res.send(err);
            }

            console.log('found: ' + todo);

            res.json(todo);
        });

    });

    // update
    app.post('/todo/update', function(req, res){

        throw notImplemented();

        //noinspection UnreachableCodeJS
        Todo.update();

    });

    // delete
    app.delete('/todo/delete/:todo_id', function(req, res){

        console.log('deleting: ' + req.params.todo_id);

        Todo.remove({
            _id: req.params.todo_id
        }, function(err, todo) {
            if (err) {
                res.send(err);
            }


            Todo.find(function(err, todo) {
                if (err) {
                    res.send(err);
                }

                res.json(todo);
            });
        });

    });






// models
var Todo = mongoose.model('Todo', {
    text: String,
    date: Date
});






// start
app.listen(config.port);
console.log();
console.log('Starting on port: ' + config.port);
