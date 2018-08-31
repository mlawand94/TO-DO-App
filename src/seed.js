'use strict'

var Todo = require('./models/todo.js');

var todos = [
    'Feed the dog',
    'Walk the kids',
    'Water the trees'
];

/*
    For each element in our todos array, we will look for a todo that is equal to the string
    If we dont find that todo and there is not an error, we are going to create the todo with a property completed as false
    and with a name that is equal to the name of the current todo that we are iterating through in the array. 
*/
todos.forEach(function(todo, index){
    Todo.find({'name':todo}, function(err, todos){
        if(!err && !todos.length){
            Todo.create({
                completed: false,
                name: todo                    
            })
        }
    });
});