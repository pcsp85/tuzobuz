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
}]);

tuzobusController.controller('tbServicio',['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http){
	$scope.servicio = [];
	$http.get('app/data/servicios/'+$routeParams.idServicio+'.json').success(function (data){
		$scope.servicio =  data;
	});
}]);

tuzobusController.controller('mapWidgetCtrl', ['$scope', 'drawChannel','clearChannel', function ($scope, drawChannel, clearChannel) {
      $scope.drawWidget = {
        controlText: 'draw',
        controlClick: function () {
          drawChannel.invoke()
        }
      };
      $scope.clearWidget = {
        controlText: 'clear',
        controlClick: function () {
          clearChannel.invoke()
        }
      };
    }]);

tuzobusController.controller('tbGMCtrl',['$rootScope', '$scope',"uiGmapLogger", 'drawChannel','clearChannel', function ($rootScope, $scope, $log,drawChannel, clearChannel){
	$scope.map = {
		dragZoom: {options: {}},
		center:{
			latitude: 20.0986,
			longitude: -98.7592
		},
		pan: true,
		zoom: 12,
		refresh: false,
        options: {
          disableDefaultUI: true
        },
        events: {},
        bounds: {},
        polys: [],
        draw: undefined
	};
        $('.angular-google-map-container').css('width', $('.view-frame').width()).css('height', $(window).height()-120 );
        $('.navmenu-default a[href="#/mapa"]').addClass('active').parent().siblings().children('a').removeClass('active');
      var clear = function(){
        $scope.map.polys = [];
      };
      var draw = function(){
        $scope.map.draw();//should be defined by now
      };
      //add beginDraw as a subscriber to be invoked by the channel, allows controller to controller coms
      drawChannel.add(draw);
      clearChannel.add(clear);
}]);

tuzobusController.controller('tbGMDetCtrl',['$rootScope', '$scope',"uiGmapLogger", 'drawChannel','clearChannel', '$routeParams', '$http', function ($rootScope, $scope, $log,drawChannel, clearChannel, $routeParams, $http){
	$scope.tipo = $routeParams.mtype;
  $scope.map = {
		dragZoom: {options: {}},
		center:{
			latitude: 20.0986,
			longitude: -98.7592
		},
		pan: true,
		zoom: 14,
		refresh: false,
        options: {
          disableDefaultUI: true
        },
        events: {},
        bounds: {},
        polys: [],
        draw: undefined
	};
        $('.angular-google-map-container').css('width', $('.view-frame').width()).css('height', $(window).height()-120 );
         $('.navmenu-default a[href="#/mapa"]').addClass('active').parent().siblings().children('a').removeClass('active');
     var clear = function(){
        $scope.map.polys = [];
      };
      var draw = function(){
        $scope.map.draw();//should be defined by now
      };
      //add beginDraw as a subscriber to be invoked by the channel, allows controller to controller coms
      drawChannel.add(draw);
      clearChannel.add(clear);
}]);
