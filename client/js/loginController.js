angular.module('uiRouterSample')
.controller("loginController" ,function ($scope, $state, $http, loginFactory) {
    console.log("Hello from login controller")
    $scope.user;
    $scope.loggedIn = false;
    //Sets the scope if the user refreshes
    $http.get('/api/user/').success(function(data) {
        $scope.user = data;
        console.log("Success grabbing user on refresh...", data)
        window.donuts = $scope.user
        window.holes = $scope.loggedIn;
        if(data !== ""){
            $scope.loggedIn = true;
            console.log("Logged in!!!!", $scope.loggedIn)
        }
    });
    
    $scope.credentials = {}

    $scope.login = function(){
        console.log("Logging in...", $scope.credentials)
        var handleSuccess = function(data){
            console.log("Callback....", data)
            $scope.user = data;
            if(data !== ""){
                $scope.loggedIn = true
                console.log("Logged in!!!", $scope.loggedIn)
            }
        }
        var credits = $scope.credentials
        loginFactory.postLogin(credits, handleSuccess)
    }

    // function handleSuccess(data, status){
    //     console.log("Success....", data, status)
    // }


    $scope.logoutUser = function(){
        console.log("So you want to log out...?")
        var handleSuccess = function(data){
            console.log("Success on logout")
             $scope.loggedIn = false;
        }
        loginFactory.submitLogout(handleSuccess)
    }
    

});

angular.module('uiRouterSample')
    // A RESTful factory for retreiving contacts from 'contacts.json'

.factory('loginFactory', function($http){
    console.log("Hello from login Factory")
    var currentUser;
    var errorMsg;
    return {
        postLogin: function(loginInfo, callback) {
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
                callback(data.user)
            })
            .error(function(data, status){
                console.log("Failure...", data, status)
                errorMsg = "Please try again"
            })
        },
        submitLogout: function(callback){
            $http.get('/dmz/logout')
            .success(function(data){
                console.log("Success from factory ", data)
                callback(data)
            })
        },
        getCurrUser: function(){
            return currentUser;
        }
    }
    })