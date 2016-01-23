/* jshint devel:true */
var elements = [];

$(document).ready(function() {
	elements['body'] = $('body');
	elements['html'] = $('html');

	if(UXPin.getLocation()) {
		elements['html'].addClass('modal-open');
	} 

	$('.content-wrapper').click(function() {
		UXPin.setLocation('profile');
		elements['html'].addClass('modal-open');
	});


	$('.close-btn').click(function() {
		UXPin.setLocation();
		elements['html'].removeClass('modal-open');
	});

	UXPin.refreshView();

})


window.onhashchange = function() {
	UXPin.setLocation(UXPin.getLocation());
}
// utils 

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}

function UXPin () {}

UXPin.setLocation = function(location) {
	$(this).addClass('active');
	UXPin.resetView();
	location = location ? '/#'+location : '/';
	window.history.pushState("", "", location);
	UXPin.refreshView();
}

UXPin.getLocation = function() {
	return window.location.hash.substring(1);
}

UXPin.refreshView = function() {
	$('[data-'+UXPin.getLocation()+']').addClass('active')
	if(!UXPin.getLocation()) {
		elements['html'].removeClass('modal-open');
	}
}

UXPin.resetView = function() {
	$('.active').removeClass('active')
}