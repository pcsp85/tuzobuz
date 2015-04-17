/* Tuzobus Script */

$(document).ready(function(){
	$('body').swiperight(function(){
		$('.navmenu-default').offcanvas('show');
	});
	$('body').swipeleft(function(){
		$('.navmenu-default').offcanvas('hide');
	});
});