angular.module('uiRouterSample')
.controller("dbController" ,function ($scope, $state, movieFactory) {
    console.log("Hello from dbController")    

    movieFactory.getMovies(handleSuccess)

    function handleErrors(data, status){
        console.log("Handler", data, status)
    }

    function handleSuccess(data, status){
        console.log("Success")
        $scope.movieList = data
    }

    $scope.movieList = [];


    function handleSuccess2(data, status){
        console.log(data, status)
        $scope.movieList = data;
    }

    $scope.movieModel = {
        title: "",
        rating: "XXX"
    }
    $scope.AddMovie = function(){
        console.log("ADDING", $scope.movieModel )
        movieFactory.saveMovie($scope.movieModel)
    }


    //textAngular

    $scope.note = {
        id: 0,
        content: '<b>Press Back and Forward to simulate loading a new note</b><div><b><br/></b></div><div><img src="http://puppydogweb.com/gallery/puppies/labradorretriever2.jpg"/><b><br/></b></div>'
    }

    

})

.factory('movieFactory', function($http, errors){
    console.log("Hello from movie Factory")
    var movieList;
    return {
        saveMovie: function(movie, callback){
            $http.post("secure/admin/movies", movie)
            .success(function(data){
                console.log("Success from factory ", data)
                // callback(data)
            })
            .error(function(data, status, headers, config){
                console.log("Fail from factory ", data, status)
                // callback(data)
                errors.addErr("danger", data)
            })
        },
        getMovies: function(callback){
            $http.get("secure/admin/movies")
            .success(function(data){
                console.log("Success from factory ", data)
                callback(data)
            })
            .error(function(data, status, headers, config){
                console.log("Fail from factory ", data, status)
                callback(data, status)
            })
        }
    }
    })

