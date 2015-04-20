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

tuzobusController.controller('tbServicios',['$scope', 'Servicios', function ($scope, Servicios){
	$scope.servicios = Servicios.query();
}]);

tuzobusController.controller('tbServicio',['$scope', '$routeParams', 'Servicios', function ($scope, $routeParams, Servicios){
	$scope.servicio = Servicios.get({idServicio:$routeParams.idServicio});
}]);


tuzobusController.controller('tbGMCtrl',['$rootScope', '$scope',"uiGmapLogger", function ($rootScope, $scope, $log){
	$scope.map = {
		dragZoom: {options: {}},
		center:{
			latitude: 20.0986,
			longitude: -98.7592
		},
		zoom: 12,
		refresh: false,
    options: {
      disableDefaultUI: true
    },
    bounds: {},
	};
  /* redimencionando y activamdo el estado del menú */
  $('.angular-google-map-container').css('width', $('.view-frame').width()).css('height', $(window).height()-120 );
  $('.navmenu-default a[href="#/mapa"]').addClass('active').parent().siblings().children('a').removeClass('active');
}]);

tuzobusController.controller('tbGMDetCtrl',['$rootScope', '$scope',"uiGmapLogger", '$routeParams', 'Estaciones', function ($rootScope, $scope, $log, $routeParams, Estaciones){
  $scope.tipo = $routeParams.mtype;

  $scope.map = {
		center:{
			latitude: 20.0806,
			longitude: -98.7692
		},
		zoom: $scope.tipo == "servicio" ? 12 : 16,
		refresh: false,
    options: {
      disableDefaultUI: true
    },
    events: {},
    bounds: {}
	};
  $scope.marcas = [];

  $scope.$watch(function (){
    return $scope.map.bounds;
  }, function (nv, ov){
      if($scope.tipo=="servicio"){
        var estaciones = Estaciones.query(function (data){
          var count = 0;
          $(data).each(function (i,e){
            if($.inArray($routeParams.mid, e.servicios) != -1){
              $scope.marcas[$scope.marcas.length]  = {id: count, latitude: e.latitude, longitude: e.longitude, title: e.name};
              count++;
            }
          });
        });
      }else{
        //marcas = Estaciones({idEstacion:$routeParams.mid})
      }

  }, true);



  /* redimencionando y activamdo el estado del menú */
  $('.angular-google-map-container').css('width', $('.view-frame').width()).css('height', $(window).height()-120 );
  $('.navmenu-default a[href="#/mapa"]').addClass('active').parent().siblings().children('a').removeClass('active');

}]);
