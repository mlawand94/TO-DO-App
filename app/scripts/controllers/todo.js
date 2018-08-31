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


'use strict';

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
