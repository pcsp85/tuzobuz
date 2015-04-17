'use strict';

/* Controllers */

var tuzobusController = angular.module('tuzobusController',[]);

tuzobusController.controller('tbMenuCtrl',['$scope', '$http', function ($scope, $http){
	
	$scope.items = [];
	$http.get('app/data/menu.json').success(function (data){
		$scope.items = data;
	});

	$scope.hide = function (){
		$('.navmenu-default').offcanvas('hide');
		$('.navmenu-default a[href="#/'+this.item.target+'"]').addClass('active').parent().siblings().children('a').removeClass('active');
	};
}]);

tuzobusController.controller('tbServicios',['$scope', '$http', function ($scope, $http){
	$scope.servicios = [];
	$http.get('app/data/servicios.json').success(function (data){
		$scope.servicios = data;
	});

	$scope.view_map = function (e){
		console.log(e);
	};
}]);