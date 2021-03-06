'use strict';

/* Controllers */
//var remote_FD = 'http://www.vivamexico.co.nz/tuzobusApp/';
var remote_FD = 'http://localhost/ApptestBe/';

var tuzobusController = angular.module('tuzobusController',[]);
/*
tuzobusController.controller('out',['$scope', function ($scope){
  $scope.out =  function (){
    navigator.app.exitApp();
  };
}]);
*/
tuzobusController.controller('main', ['$scope', '$http', function ($scope, $http){
  var h = ($(window).height()-52)/3;
  $('.pachuca, .home a').css('height', h);
  $('.home a').each(function (){
    $(this).css('width',$(this).parent().width());
  });

  if(!localStorage.TuzobusApp_activated || localStorage.TuzobusApp_activated == "NO"){
    $http.get(remote_FD+'v/?action=activation_dates').success(function (data){
      if(new Date() > new Date(data.begin_date) && new Date() < new Date(data.end_date)){
        // Activa Formulario para ingresar código de validación
        $('#activate_form').css('height',$(window).height()).slideDown('slow');
      }else if(new Date() > new Date(data.end_date)){
        // Validación sin código
        localStorage.TuzobusApp_activated = "YES";
        $('.nav.navmenu-nav a[href="#/comoUsar"]').click();
      }
    });
  }

  $scope.activateApp = function (){
    $('#activate_code').parent().parent().parent().find('.alert').detach();
    if(!$('#activate_code').val()){
      $('#activate_code').parent().parent().after('<div class="alert alert-warning">¡Debes ingresar el código de tu invitación!</div>');
    }else{
      var code = $('#activate_code').val();
      var dev = window.device.uuid;
      var con = navigator.connection.type;
//      var dev = 'device.uuid';
//      var con = 'navigator.connection.type';
      $http.get(remote_FD+'v/?action=activate_App&code='+code+'&device='+dev+'&conection='+con).success(function (data){
        if(data.result=='error'){
          $('#activate_code').parent().parent().after('<div class="alert alert-warning">'+data.message+'</div>');
        }else if(data.result=='success'){
          $('#activate_code').parent().parent().after('<div class="alert alert-success">'+data.message+'</div>');
          localStorage.TuzobusApp_activated = "YES";
          setTimeout(function (){
            $('#activate_form').slideUp('slow', function (){
              $('.nav.navmenu-nav a[href="#/comoUsar"]').click();
            });

          }, 1500);
        }
      });

    }
  };
}]);

tuzobusController.controller('tbMenuCtrl',['$scope', '$http', function ($scope, $http){
	
	$scope.items = [];
	$http.get('app/data/menu.json').success(function (data){
		$scope.items = data;
	});

	$scope.hide = function (){
		$('.navmenu-default').offcanvas('hide');
		$('.navmenu-default a[href="#/'+this.item.target+'"]').addClass('active').parent().siblings().children('a').removeClass('active');
    if(this.item.target=='salir'){
      navigator.app.exitApp();
    }
	};
}]);

tuzobusController.controller('tbGMCtrl',['$rootScope', '$scope','uiGmapLogger', 'Estaciones', '$http', function ($rootScope, $scope, $log, Estaciones, $http){
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
      disableDefaultUI: false
    },
    bounds: {},
	};
  $scope.marcas = [];
  $scope.lines_i = [];
  $scope.lines_v = [];

  $scope.$watch(function (){
    return $scope.map.bounds;
  }, function (nv, ov){
    var estaciones = Estaciones.query( function (estaciones){
      $(estaciones).each(function (i,e){
        $scope.marcas[i] = {id:i, latitude: e.latitude, longitude: e.longitude, title: e.name, icon: e.icon};
      });
    });
  }, true);

  /* redimencionando y activamdo el estado del menú */
  $('.angular-google-map-container').css('height', $(window).height() - (Math.round($('.angular-google-map-container').offset().top) + 15 ));
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
      disableDefaultUI: false
    },
    events: {},
    bounds: {}
	};
  $scope.marcas = [];
  $scope.lines_i = [];
  $scope.lines_v = [];

  var flag = false;

  $scope.$watch(function (){
    return $scope.map.bounds;
  }, function (nv, ov){
      if(tipo=="servicio"){
        var servicio = Servicios.get({idServicio:$routeParams.mid}, function (servicio){
          $scope.h1 = servicio.name;
        });

        var estaciones = Estaciones.query(function (estaciones){
          var count = 0;
          $(estaciones).each(function (i,e){
            if($.inArray($routeParams.mid, e.servicios) != -1){
              $scope.marcas[$scope.marcas.length]  = {id: count, latitude: e.latitude, longitude: e.longitude, title: e.name, icon: e.icon};
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
          $scope.marcas[0] = {id:0, latitude: estacion.latitude, longitude: estacion.longitude, title: estacion.name, icon: estacion.icon}
        });
      }

  }, true);

  /* redimencionando y activamdo el estado del menú */
  $('.angular-google-map-container').css('height', $(window).height() - (Math.round($('.angular-google-map-container').offset().top) + 15 ));
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

  $scope.h = ($(window).height() - $('.servicioDetail').offset().top - $('.servicios h1').height() - 50);

  $scope.$watch(function(){
    return $scope.servicio;
  }, function (nv, ov){
    if(nv !== ov){
      $('.servicio_mapa').append('<embed id="svg_mapa" src="'+$scope.servicio.mapa+'" alt="svg image of a '+$scope.servicio.name+'" style="width: 100%; height: '+$scope.h+'px; border:1px solid #3B3E40; "/>');
      setTimeout(function(){
        svgPanZoom('#svg_mapa', {
          zoomEnabled: true,
          controlIconsEnabled: true,
          fit: true,
          center: true
        });
      },500);

      $('.navmenu-default a[href="#/servicios"]').addClass('active').parent().siblings().children('a').removeClass('active');
    }
  }, true);
}]);

tuzobusController.controller('tbRank',['$scope', '$http', function ($scope, $http){
  $scope.calificar = function (r){
    if(r=='si'){
      $('.calificar_si').slideDown('slow').next().slideUp('slow');
    }
    if(r=='no'){
      $('.calificar_no').slideDown('slow').prev().slideUp('slow');
    }
  };
  $scope.cancel = function (){
    $('.calificar_si').slideUp('slow');
    $('.calificar_no').slideUp('slow').find('textarea').val('');
  };
  $scope.rank = function(){
    var so = window.device.platform;
    //var so = 'iOS'; 
    $http.get(remote_FD+'v/?action=store_info&so='+so).success(function (data){
      $('.calificar_si').slideUp('slow');
      window.open(encodeURI(data.rank), '_system');
    });
  };
  $scope.coments = function(){
    var coments = $('.calificar_no textarea').val();
    var email = $('.calificar_no input[type=email]').val();
    $('.calificar_no .alert').detach(); 
    if(!coments || coments==''){
      $('.calificar_no').prepend('<div class="alert alert-warning">El campo de comentarios es obligatorio</div>');
    }else{
      $http.post(remote_FD+'v/',{action:"coments", coments:coments, email:email}).success(function(data){
        if(data.result=="error"){
          $('.calificar_no').prepend('<div class="alert alert-warning">'+data.message+'</div>');
        }else if(data.result=="success"){
          $('.calificar_no').prepend('<div class="alert alert-success">'+data.message+'</div>');
        }
      });
    }
  };
}]);

tuzobusController.controller('tbAds',['$scope', '$http', 'Ads', function ($scope, $http, Ads){
  $scope.ads = Ads.query();

  $scope.goAds = function (t){
    var dev = window.device.uuid;
    $http.get(remote_FD+'v/?action=go_ad&id_ad='+t+'&device='+dev).success(function (data){
      if(data.result=='success'){
        window.open(encodeURI(data.href), '_system');
      }
    });
  };

}]);

tuzobusController.controller('tbHorarios',['$scope', '$http', function ($scope, $http){
  $http.get(remote_FD+'v/?action=get_horarios').success(function (data){
    $scope.horarios = data;
  });
}]);

tuzobusController.controller('tbEstacionesCercanas', ['$scope', 'filterFilter', 'Estaciones', 'Servicios', function ($scope, filterFilter, Estaciones, Servicios){
  $scope.position = navigator.geolocation.getCurrentPosition(posSuccess, posError, {enableHighAccuracy: true,timeout: 3000});

  function posSuccess (position){
    var search = {
      'latitude': position.coords.latitude,
      'longitude': position.coords.longitude
    }
    var presition = 2.004;
    var estaciones = [];
    var la_ls = parseFloat(search.latitude) + presition, la_li = parseFloat(search.latitude) - presition;
    var lo_ls = parseFloat(search.longitude) + presition, lo_li = parseFloat(search.longitude) - presition;
    Estaciones.query().$promise.then(function (data){
      $(data).each(function(i,e){
        e.distancia = distancia(search,e);
        e.serv = [];
        $(e.servicios).each(function (i,el){
          Servicios.get({idServicio:el}, function (servicio){
            e.serv.push({clase:el,name:servicio.name });
          });
        });
        if(e.latitude>= la_li && e.latitude<=la_ls && e.longitude>=lo_li && e.longitude<=lo_ls) estaciones.push(e);
      });
    });
    $scope.estaciones = estaciones;
    $('#locationStatus').removeClass('alert-warning').addClass('hide').html('Posición OK <br> latitude:'+search.latitude+'<br> longitude:'+search.longitude);
  }

  function posError (error){
    $('#locationStatus').removeClass('hide').addClass('alert-warning').html('<strong>ERROR</strong><br>No pudimos detectar tu posición<br><div class="text-center"><button class="btn btn-primary" onclick="location.reload(true);">Volver a intentar</button></div>');
    //alert('Error: '+ error.code + '\n' + 'Mensaje: '+ error.message + '\n');
  }

  function distancia(o,d){
    var rad = function(x) {return x*Math.PI/180;}

    var R     = 6378.137;
    var dLat  = rad(d.latitude-o.latitude);
    var dLong = rad(d.longitude-o.longitude);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(o.latitude)) * Math.cos(rad(d.latitude)) * Math.sin(dLong/2) * Math.sin(dLong/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;

    return Math.round(d*1000) + ' m';
  }

}]);

tuzobusController.controller('alimentadorasCtrl', ['$scope', 'Alimentadoras', function ($scope, Alimentadoras){
  $scope.rutas = Alimentadoras.query(function (data){
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

  $('.navmenu-default a[href="#/rutasAlimentadoras"]').addClass('active').parent().siblings().children('a').removeClass('active');
}]);

tuzobusController.controller('alimentadorasMapa', ['$rootScope', '$scope', 'uiGmapLogger', '$routeParams', 'Alimentadoras', function ($rootScope, $scope, $log, $routeParams, Alimentadoras){
  var idRuta = $routeParams.idRuta;
  $scope.map = {
    center:{
      latitude: 20.03393,
      longitude: -98.81244
    },
    zoom: 15,
    refresh: false,
    options: {
      disableDefaultUI: false
    },
    events: {},
    bounds: {}
  };
  $scope.paradas = [];
  $scope.rutas = [];
  var flag = false;
  $scope.$watch(function(){
    return $scope.map.bounds;
  },function (nv,ov){
    Alimentadoras.get({idRuta:idRuta}, function (ruta){
      $scope.h1 = ruta.id.toUpperCase() + ' ' + ruta.begin.name + ' - ' + ruta.end.name;
      if(flag==false){
        $scope.map.center.latitude = (ruta.begin.latitude + ruta.end.latitude) / 2;
        $scope.map.center.longitude = (ruta.begin.longitude + ruta.end.longitude) / 2;
        flag = true;
      }
      $scope.paradas[$scope.paradas.length]  = {id: 0, latitude: ruta.begin.latitude, longitude: ruta.begin.longitude, title: ruta.begin.name, icon: ruta.begin.icon};
      $(ruta.paradas).each(function (n,p){
        $scope.paradas[$scope.paradas.length] = {id: $scope.paradas.length, latitude: p.latitude, longitude: p.longitude, title: "parada", icon: "assets/img/alimentadoras_icons/bus.png"};
      });
      $scope.paradas[$scope.paradas.length]  = {id: $scope.paradas.length, latitude: ruta.end.latitude, longitude: ruta.end.longitude, title: ruta.end.name, icon: ruta.end.icon};
      $scope.rutas[0] = {id:0, path:ruta.ruta_ida, stroke:{color:"#009D57"}, visible:true}
      $scope.rutas[1] = {id:1, path:ruta.ruta_vuelta, stroke:{color:"#DB4436"}, visible:true}
      $('.angular-google-map-container').css('height', $(window).height() - (Math.round($('.angular-google-map-container').offset().top) + 15 ));
    });
  }, true);

  /* activando el estado del menú */
  $('.navmenu-default a[href="#/rutasAlimentadoras"]').addClass('active').parent().siblings().children('a').removeClass('active');
}]);