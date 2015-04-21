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

tuzobusController.controller('tbGMCtrl',['$rootScope', '$scope','uiGmapLogger', 'Estaciones', function ($rootScope, $scope, $log, Estaciones){
	$scope.h1 = "Mapa";
  $scope.map = {
		dragZoom: {options: {}},
		center:{
			latitude: 20.0806,
			longitude: -98.7692
		},
		zoom: 12,
		refresh: false,
    options: {
      disableDefaultUI: true
    },
    bounds: {},
	};
  $scope.marcas = [];

  $scope.$watch(function (){
    return $scope.map.bounds;
  }, function (nv, ov){
    var estaciones = Estaciones.query( function (estaciones){
      $(estaciones).each(function (i,e){
        $scope.marcas[i] = {id:i, latitude: e.latitude, longitude: e.longitude, title: e.name};
      });
    });
  }, true);

  /* redimencionando y activamdo el estado del menú */
  $('.angular-google-map-container').css('width', $('.view-frame').width()).css('height', $(window).height()-120 );
  $('.navmenu-default a[href="#/mapa"]').addClass('active').parent().siblings().children('a').removeClass('active');
}]);

tuzobusController.controller('tbGMDetCtrl',['$rootScope', '$scope',"uiGmapLogger", '$routeParams', 'Estaciones', 'Servicios', function ($rootScope, $scope, $log, $routeParams, Estaciones, Servicios){
   var tipo = $routeParams.mtype;

  $scope.map = {
		center:{
			latitude: 20.0806,
			longitude: -98.7692
		},
		zoom: tipo == "servicio" ? 12 : 14,
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
      if(tipo=="servicio"){
        var servicio = Servicios.get({idServicio:$routeParams.mid}, function (servicio){
          $scope.h1 = "Servicio " + servicio.name;
        });

        var estaciones = Estaciones.query(function (estaciones){
          var count = 0;
          $(estaciones).each(function (i,e){
            if($.inArray($routeParams.mid, e.servicios) != -1){
              $scope.marcas[$scope.marcas.length]  = {id: count, latitude: e.latitude, longitude: e.longitude, title: e.name};
              count++;
            }
          });
        });
      }else if(tipo=="estacion"){
        var estacion = Estaciones.get({idEstacion:$routeParams.mid}, function (estacion){
          $scope.h1 = "Estación " + estacion.name;
          $scope.map.center.latitude = estacion.latitude;
          $scope.map.center.longitude = estacion.longitude;
          $scope.marcas[0] = {id:0, latitude: estacion.latitude, longitude: estacion.longitude, title: estacion.name}
        });
      }

  }, true);



  /* redimencionando y activamdo el estado del menú */
  $('.angular-google-map-container').css('width', $('.view-frame').width()).css('height', $(window).height()-120 );
  $('.navmenu-default a[href="#/mapa"]').addClass('active').parent().siblings().children('a').removeClass('active');

}]);

tuzobusController.controller('tbEstaciones',['$scope', 'Estaciones', function ($scope, Estaciones){
  $scope.estaciones = Estaciones.query(function (data){
    setTimeout(function(){
      $('.icon').each(function (){
        $(this).css('height', $(this).width());
      });
    }, 100);
  });
  $('.navmenu-default a[href="#/estaciones"]').addClass('active').parent().siblings().children('a').removeClass('active');
}]);

tuzobusController.controller('tbServicios',['$scope', 'Servicios', function ($scope, Servicios){
  $scope.servicios = Servicios.query();
}]);

tuzobusController.controller('tbServicio',['$scope', '$routeParams', 'Servicios', function ($scope, $routeParams, Servicios){
  $scope.servicio = Servicios.get({idServicio:$routeParams.idServicio});


}]);
