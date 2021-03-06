/* Tuzobus Script */
$(document).ready(function(){
	$('body').swiperight(function(e){
		//console.log(e)
		$('.navmenu-default').offcanvas('show');
	});
	$('body').swipeleft(function(){
		$('.navmenu-default').offcanvas('hide');
	});
	document.addEventListener("menubutton", menuButton, false);
	document.addEventListener('deviceready', AdsMob, false);
});

var est_toogle = function (o){
	o.addClass('active').find('.stage2').show().animate({'margin-left': '20%'}, 500);
    o.siblings('.active').find('.stage2').animate({'margin-left':'100%'}, 500, function(){
    	$(this).hide();
    	$(this).parent().removeClass('active');
    });
};

var menuButton = function (){
	if($('.navmenu-default')=='none'){
		$('.navmenu-default').offcanvas('show');
	}else{
		$('.navmenu-default').offcanvas('hide');
	}
};

var AdsMob = function (){
	AdMob.createBanner({
		adId: 'ca-app-pub-8926293590731038/3064246506',
		position: AdMob.AD_POSITION.BOTTOM_CENTER,
		autoshow: true
	});
};