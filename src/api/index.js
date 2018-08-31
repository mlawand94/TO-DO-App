'use strict';

var express = require('express');
var Todo = require('../models/todo');
// var todos = require('../../mock/todos.json');

var router = express.Router();

router.get('/todos', function(req, res) {
	Todo.find({}, function(err, todos){
		if(err){
			// Do something
			return res.status(500).json({message:err.message});
		}
		res.json({todos: todos});
	});
	// res.json({ todos: todos });
});

// TODO: Add POST route to create new entries
router.post('/todos', function(req, res){
	// Body of the request is the data for our todos
	// Express doesnt have a body parser. 
	// There-fore if we don't have body-parser installed,
	// We will probably get back an empty response body. 
	var todo = req.body;
	
	Todo.create(todo, function(err, todo){
		if(err){
			return res.status(500).json({err: err.message});
		}
		res.json({'todo':todo, message: 'Todo Created'});
	});
	// res.send(todo);
});

// TODO: Add PUT route to update existing entries
router.put('/todos/:id', function(req, res){
	var id = req.params.id;	
	var todo = req.body;
	if(todo && todo._id !== id){
		return res.status(500).json({err: 'Ids dont match!'});
	}
	// Look up the todo by it's ID, then update
	// OUr mongoose model is defined by findByIdAndUpdate()
	Todo.findByIdAndUpdate(id, todo, {new: true} ,function(err, todo){
		if(err){
			return res.status(500).json({err: err.message});
		}
		res.json({'todo':todo, message: 'Todo Updated'});
	});
	// res.send(todo);
});

// TODO: Add DELETE route to remove existing entries

module.exports = router;
