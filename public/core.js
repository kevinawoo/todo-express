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
            console.log('read');
            console.log(data);
            $scope.todos = data;
        })
        .error(function (){
            console.log('Error: ' + data);
        });


    // update
    $scope.completeTodo = function(id) {
        var index = 0;
        $scope.todos.forEach(function (element, i, array) {
            if (element._id === id) {
                index = i;
                return false;
            }
        });
                console.log(index);




        console.log('update: ' + index);
        console.log($scope.todos);
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
