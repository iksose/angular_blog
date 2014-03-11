angular.module('uiRouterSample')
.controller("loginController" ,function ($scope, $state, $http, loginFactory) {
    console.log("Hello from login controller")
    
    $scope.credentials = {}
    
    $scope.login = function(){
        console.log("Logging in...", $scope.credentials)
        var credits = $scope.credentials
        loginFactory.postLogin(credits)
    }

    function handleSuccess(data, status){
        console.log("Success....", data, status)
    }

    


    $scope.doSomething = function(){
        console.log("Doing something....")
    }

    

});

angular.module('uiRouterSample')
    // A RESTful factory for retreiving contacts from 'contacts.json'

.factory('loginFactory', function($http){
    console.log("Hello from login Factory")
    var currentUser;
    return {
        postLogin: function(loginInfo) {
            console.log("POST DUDE", loginInfo)
            $http({
                method: 'POST',
                url: '/dmz/login',
                // data: params,
                params: loginInfo,
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' } 
            })
            .success(function(data, status){
                console.log("SUCCESS!!!", data, status)
                currentUser = data.user
            })
            .error(function(data, status){
                console.log("Failure...", data, status)
            })
        }
    }
    })