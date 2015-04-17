'use strict';

/* Tuzobus App */

var tuzobusApp = angular.module('tuzobusApp',[
	'ngRoute',
	'tuzobusController',
	'tuzobusServices'
	]);

tuzobusApp.config(['$routeProvider',
	function ($routeProvider){
		$routeProvider
		.when('/',{
			templateUrl: 'views/index.html',
		})
		.when('/mapa',{
			templateUrl: 'views/mapa.html',
		})
		.when('/estaciones',{
			templateUrl: 'views/estaciones.html',
		})
		.when('/servicios', {
			templateUrl: 'views/servicios.html',
			controller: 'tbServicios',
		})
		.when('/horarios', {
			templateUrl: 'views/horarios.html',
		})
		.when('/comoUsar', {
			templateUrl: 'views/comoUsar.html',
		})
		.when('/estacionesCercanas', {
			templateUrl: 'views/estacionesCercanas.html',
		})
		.when('/rutasAlimentadoras', {
			templateUrl: 'views/rutasAlimentadoras.html',
		})
		.when('/comoLlegar', {
			templateUrl: 'views/comoLlegar.html',
		})
		.when('/notificaciones', {
			templateUrl: 'views/notificaciones.html',
		})
		.when('/perfil', {
			templateUrl: 'views/perfil.html',
		})
		.otherwise({
			redirectTo: '/'
		})
	}]);