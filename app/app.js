'use strict';

/* Tuzobus App */

var tuzobusApp = angular.module('tuzobusApp',[
	'ngRoute',
	'tuzobusController',
	'uiGmapgoogle-maps',
	'tuzobusFilters',
	'tuzobusServices'
	]);

tuzobusApp.config(['$routeProvider',
	function ($routeProvider){
		$routeProvider
		.when('/',{
			templateUrl: 'views/index.html',
			controller: 'main',
		})
		.when('/mapa',{
			templateUrl: 'views/mapa.html',
			controller: 'tbGMCtrl',
		})
		.when('/mapa/:mtype/:mid',{
			templateUrl: 'views/mapa.html',
			controller: 'tbGMDetCtrl',
		})
		.when('/estaciones',{
			templateUrl: 'views/estaciones.html',
			controller: 'tbEstaciones',
		})
		.when('/servicios', {
			templateUrl: 'views/servicios.html',
			controller: 'tbServicios',
		})
		.when('/servicios/:idServicio',{
			templateUrl: 'views/servicioDetail.html',
			controller: 'tbServicio',
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
		.when('/calificar', {
			templateUrl: 'views/calificar.html',
		})
		.when('/perfil', {
			templateUrl: 'views/perfil.html',
		})
		.when('/sobre', {
			templateUrl: 'views/sobre.html',
		})
		.otherwise({
			redirectTo: '/'
		})
	}]);