"use strict";

// setup
var config = {
    port: 8080
};

var express = require('express');
var app = express();
var mongoose = require('mongoose');


// configuration
mongoose.connect('mongodb://todo-express:expressIsFUN@dbh26.mongolab.com:27267/todo');

app.configure(function() {
    app.use(express.static(__dirname + '/public'));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
});




// models
var Todo = mongoose.model('Todo', {
    text: String,
    date: Date,
    completed: Boolean
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
    app.get('/todo/update', function(req, res){
        console.log('query: %j',  req.query);

        Todo.findByIdAndUpdate(req.query.id, {
            "completed": (req.query.completed === 'true')
        }, function(err, todo) {
            if (err) {
                res.send(err);
            }

            console.log('todo set at: %j', todo);


            Todo.find(function(err, todo) {
                if (err) {
                    res.send(err);
                }

                console.log('found: ' + todo);

                res.json(todo);
            });

        });
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




// start
app.listen(config.port);
console.log();
console.log('Starting on port: ' + config.port);
