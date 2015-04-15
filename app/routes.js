angular.module('NoteWrangler')
	.config(function ($routeProvider){
		$routeProvider.when('/mapa', {
			templateUrl: 'views/mapa.html',
		})
	});