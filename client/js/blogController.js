angular.module('uiRouterSample')
.controller("blogController" ,function ($scope, $state, blogFactory) {
    console.log("Hello from blog Controller")    


    //textAngular

    $scope.note = {
        id: 0,
        title: "Title goes here",
        body: '<b>Press Back and Forward to simulate loading a new note</b><div><b><br/></b></div><div><img src="http://puppydogweb.com/gallery/puppies/labradorretriever2.jpg"/><b><br/></b></div>'
    }

    var handleThis = function(data){
        console.log("Handling....", data[0])
        $scope.note = data[0]
    }

    blogFactory.getMovies(handleThis)

    $scope.funUpdate = function(data){
        console.log("Well okay I guess...", data)
        // var obj = {_id: data}
        blogFactory.updatePost(data)
    }

    

})

.factory('blogFactory', function($http, errors){
    console.log("Hello from blog Factory")
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
            $http.get("/blogposts")
            .success(function(data){
                console.log("Success from factory ", data)
                callback(data)
            })
            .error(function(data, status, headers, config){
                console.log("Fail from factory ", data, status)
                callback(data, status)
            })
        },
        updatePost: function(blog){
            console.log("Updating this : ", blog)
            $http.post("/blogposts", blog)
            .success(function(data){
                console.log("Success from factory ", data)
                // callback(data)
            })
            .error(function(data, status, headers, config){
                console.log("Fail from factory ", data, status)
                // callback(data)
                // errors.addErr("danger", data)
            })

        }
    }
    })

