webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

angular.module('todoListApp', []);

__webpack_require__(3);
__webpack_require__(5);
__webpack_require__(7);


/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

angular.module('todoListApp').service('dataService', __webpack_require__(4));


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

angular.module('todoListApp').directive('todo', __webpack_require__(6));


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function ToDoDirective () {
  return {
    templateUrl: 'templates/todo.html',
    replace: true,
    controller: 'todoCtrl'
  }
}

module.exports = ToDoDirective;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

angular.module('todoListApp').controller('mainCtrl', __webpack_require__(8));
angular.module('todoListApp').controller('todoCtrl', __webpack_require__(9));


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function MainCtrl ($scope, dataService) {

  dataService.getTodos(function(response){
    var todos = response.data.todos;
    $scope.todos =  todos;
  });

  $scope.addTodo = function() {
    $scope.todos.unshift({name: "This is a new todo.",
                      completed: false});
  };

}

module.exports = MainCtrl;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 'use strict';

// function TodoCtrl ($scope, dataService) {

//   $scope.deleteTodo = function(todo, index) {
//     $scope.todos.splice(index, 1);
//     dataService.deleteTodo(todo);
//   };

//   $scope.saveTodos = function() {
//     var filteredTodos = $scope.todos.filter(function(todo){
//       if(todo.edited) {
//         return todo
//       };
//     })
//     dataService.saveTodos(filteredTodos).finally($scope.resetTodoState());
//   };

//   $scope.resetTodoState() = function(){
//     // This method has one job: 
//       // Reset the property, 'edited' on each todo, to false
//     $scope.todos.forEach(function(todo){
//       todo.edited = false;
//     });
//   };

// }


// module.exports = TodoCtrl;




function TodoCtrl ($scope, dataService) {

  $scope.deleteTodo = function(todo, index) {
    dataService.deleteTodo(todo).then(function() {
      $scope.todos.splice(index, 1);
    });
  };

  $scope.saveTodos = function() {
    var filteredTodos = $scope.todos.filter(function(todo){
      if(todo.edited) {
        return todo
      };
    })
    // Save the todos. Once that is complete,
    // reset the todo state
    dataService.saveTodos(filteredTodos)
      .finally($scope.resetTodoState());
  };

  // The method below will have one job. 
  // This will reset the property, edited, of each todo
  // From edited to false. This will occur after
  // the todos have been saved.
  $scope.resetTodoState = function() {
      $scope.todos.forEach(function(todo) {
         todo.edited = false;
      });
  }
}

module.exports = TodoCtrl;


/***/ })
],[1]);