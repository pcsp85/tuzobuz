'use strict';

/* Services */

var tuzobusServices = angular.module('tuzobusServices', ['ngResource']);

tuzobusServices.factory('Servicios', ['$resource', function ($resource){
	return $resource('app/data/servicios/:idServicio.json', {}, {
		query: {method:'GET', params:{idServicio:'servicios'}, isArray:true}
	});
}]);

tuzobusServices.factory('Estaciones',['$resource', function ($resource){
	return $resource('app/data/estaciones/:idEstacion.json', {}, {
		query: {method:'GET', params:{idEstacion:'estaciones'}, isArray:true}
	});
}]);