'use strict';

/* Tuzobus App */

var tuzobusApp = angular.module('tuzobusApp',[
	'ngRoute',
	'tuzobusController'
	]);

tuzobusApp.config(['$routeProvider',
	function ($routeProvider){
		$routeProvider.when('/mapa',{
			templateUrl: 'views/mapa.html',
		})
	}]);