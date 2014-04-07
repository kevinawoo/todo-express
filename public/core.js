var Todo = angular.module('Todo', []);


function TodoController($scope, $http) {
    $scope.formData = {};

    // when landing page, get all todos
    $http.get('/todo/read')
        .success(function(data) {
            console.log('got data: ' + data.text + ': ' + data);
            $scope.todos = data;
        })
        .error(function (){
            console.log('Error: ' + data);
        });


    // when submitting
    $scope.createTodo = function() {
        $http.post('/todo/create', $scope.formData)
            .success(function(data) {
                $scope.formData = {};   // clear the form
                $scope.todos = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };


    // delete
    $scope.deleteTodo = function (id) {
        $http.delete('/todo/delete/' + id)
            .success(function(data) {
                $scope.todos = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
}
