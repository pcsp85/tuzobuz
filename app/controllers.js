'use strict';

/* Controllers */

var tuzobusController = angular.module('tuzobusController',[]);

tuzobusController.controller('out',['$scope', function ($scope){
  $scope.out =  function (){
    navigator.app.exitApp();
  };
}]);

tuzobusController.controller('main', ['$scope', function ($scope){
  var h = ($(window).height()-52)/3;
  $('.pachuca, .home a').css('height', h);
  $('.home a').each(function (){
    $(this).css('width',$(this).parent().width());
  });
}]);

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
  $('.angular-google-map-container').css('height', $(window).height()-120 );
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

  var flag = false;

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
          if(flag==false){
            $scope.map.center.latitude = estacion.latitude;
            $scope.map.center.longitude = estacion.longitude;
            flag = true;
          }
          $scope.marcas[0] = {id:0, latitude: estacion.latitude, longitude: estacion.longitude, title: estacion.name}
        });
      }

  }, true);

  /* redimencionando y activamdo el estado del menú */
  $('.angular-google-map-container').css('height', $(window).height()-120 );
  $('.navmenu-default a[href="#/mapa"]').addClass('active').parent().siblings().children('a').removeClass('active');

}]);

tuzobusController.controller('tbEstaciones',['$scope', 'Estaciones', function ($scope, Estaciones){
  $scope.estaciones = Estaciones.query(function (data){
    setTimeout(function(){
      $('.icon').each(function (){
        var nh = $(this).width(), stw = ($(this).next().width()-$(this).next().width()*.15)/6, mst = (nh-stw)/2;
        $(this).css('height', nh)
          .next().css('height', nh)
          .find('.st').css('width', stw).css('margin-top', mst);
        $(this).next().next().css('height', nh);
      });
    }, 100);
  });
  $('.navmenu-default a[href="#/estaciones"]').addClass('active').parent().siblings().children('a').removeClass('active');
}]);

tuzobusController.controller('tbServicios',['$scope', 'Servicios', function ($scope, Servicios){
  $scope.servicios = Servicios.query();
  setTimeout( function(){
    var h = ($(window).height() - $('.servicios').offset().top - $('.servicios h1').height() - 20) / 3;
    $('.servicios a').css('height', h).find('img').each(function (){
      var nh = (h-$(this).height()-$(this).next().height()-10)/2;
      $(this).css('margin-top', nh).css('margin-bottom', nh);
    });
  }, 100);
}]);

tuzobusController.controller('tbServicio',['$scope', '$routeParams', 'Servicios', function ($scope, $routeParams, Servicios){
  $scope.servicio = Servicios.get({idServicio:$routeParams.idServicio});
}]);

tuzobusController.controller('tbAds',['$scope', 'Ads', function ($scope, Ads){
  $scope.ads = Ads.query();

  $scope.goAds = function (u){
    if(u!=false){
      //Funcion para abrir ventana y navegar al destino del anuncio
    }
  };

}]);