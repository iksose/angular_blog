angular.module('uiRouterSample')
.controller("ecmascript6_controller" ,function ($scope, errors) {
  console.log("Hello from es6")


class Vehicle {
  constructor( name, year ) {
  this.name = name;
  this.year = year;
  }

  summary() {
    return "This vehicle's name is " + this.name + " and it was manufactured in "
    + this.year;
  }
}


var charles = new Vehicle("Charles", "1964");

console.log(charles.summary())

var numbers = [1, 4, 9];
var roots = numbers.map(Math.sqrt);

console.log(numbers, roots)




})
