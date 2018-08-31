'use strict';

function DataService ($http, $q) {

  this.getTodos = function(cb) {
    $http.get('/api/todos').then(cb);
  };

  this.deleteTodo = function(todo) {
    if (!todo._id) {
      return $q.resolve();
    }
    return $http.delete('/api/todos/' + todo._id).then(function() {
      console.log("I deleted the " + todo.name + " todo!");
    });
  };

  this.saveTodos = function(todos) {
    // For each todo, we are going to push a request to the queue
    // A request to post the data to our server 
    var queue = [];
    todos.forEach(function(todo) {
      var request;
      if(!todo._id) {
        // If the request does not have an id
        // Push it to the server.
        request = $http.post('/api/todos', todo);
      } else {
        request = $http.put('/api/todos/' + todo._id, todo).then(function(result) {
          todo = result.data.todo;
          return todo;
        });
      }
      queue.push(request);
    });
        // Now we can use the queue service
    // To run all of our requests in paralell.
    // the all method iterates through our queue, runs each request, 
      // and for all of them returns a promise.
      // for each callback function there is a function (results as param)
    
    return $q.all(queue).then(function(results) {
      console.log("I saved " + todos.length + " todos!");
    });
  };

}

module.exports = DataService;
