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

tuzobusServices.factory('Ads',['$resource', function ($resource){
	return $resource(remote_FD+'v/', {}, {
		query: {method: 'POST', params:{action:'get_ads'}, isArray:true}
	})
}]);

tuzobusServices.factory('Horarios', ['$resource', function ($resource){
	return $resource(remote_FD+'v/',{}, {
		query: {method:'GET', params:{action:'get_horarios'}, isArray:true}
	})
}]);