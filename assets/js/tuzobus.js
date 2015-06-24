/* Tuzobus Script */
$(document).ready(function(){
	$('body').swiperight(function(e){
		//console.log(e)
		$('.navmenu-default').offcanvas('show');
	});
	$('body').swipeleft(function(){
		$('.navmenu-default').offcanvas('hide');
	});
});

var est_toogle = function (o){
	o.addClass('active').find('.stage2').show().animate({'margin-left': '20%'}, 500);
    o.siblings('.active').find('.stage2').animate({'margin-left':'100%'}, 500, function(){
    	$(this).hide();
    	$(this).parent().removeClass('active');
    });
};
