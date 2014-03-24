angular.module('uiRouterSample')
.controller("ecmascript6_controller" ,function ($scope, errors) {
  console.log("Hello from es6")

  var m = new Map();
  m.set("hello", 42);
  var kar = m.get("hello")

  console.log(m, kar)

console.log("This is pretty sweet");

})
