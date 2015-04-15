'use strict';

/* Controllers */

var tuzobusController = angular.module('tuzobusController',[]);

tuzobusController.controller('tbMenuCtrl',['$scope', function ($scope){
	$scope.hide = function (){
		$('.navmenu-default').offcanvas('hide');
	};
}]);