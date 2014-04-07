var Todo = angular.module('Todo', []);


function TodoController($scope, $http) {
    $scope.formData = {};


    // create
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


    // read
    $http.get('/todo/read')
        .success(function(data) {
            console.log('got data: ' + data.text + ': ' + data);
            $scope.todos = data;
        })
        .error(function (){
            console.log('Error: ' + data);
        });


    // update
    $scope.completeTodo = function(index) {
        console.log($scope.todos[index]);
        $http({
            url: '/todo/update',
            method: 'GET',
            params: {
                id: $scope.todos[index]._id,
                completed: ($scope.todos[index].completed === true)
            }
        })
            .success(function(data){
                $scope.todos = {};
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
