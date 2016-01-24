'use strict';
/* jshint devel:true */
function UXPin (jquery) {

	var elements = [];

	elements.body = jquery('body');
	elements.html = jquery('html');

	var setLocation = function(location, button) {
		
		this.resetView();
		location = location ? '/#'+location : '/';
		window.history.pushState('', '', location);
		this.refreshView();

		if(button) {
			$(button).addClass('active');
		}
	};

	var getLocation = function() {
		return window.location.hash.substring(1);
	};

	var refreshView = function() {
		$('[data-'+this.getLocation()+']').addClass('active');
		if(!this.getLocation()) {
			elements.html.removeClass('modal-open');
		}
	};

	var resetView = function() {
		$('.active').removeClass('active');
	};

	var openModal = function() {
		elements.html.addClass('modal-open');
	};

	var closeModal = function() {
		elements.html.removeClass('modal-open');
	};


	return {
		setLocation: setLocation,
		getLocation: getLocation,
		refreshView: refreshView,
		resetView: resetView,
		openModal: openModal,
		closeModal: closeModal
	};
}





$(document).ready(function() {
	var uxpin = window.uxpin = new UXPin($);

	if(uxpin.getLocation()) {
		uxpin.openModal();
	} 

	$('.content-wrapper').click(function() {
		uxpin.setLocation('profile');
		uxpin.openModal();
	});


	$('.close-btn').click(function() {
		uxpin.setLocation();
		uxpin.closeModal();
	});

	uxpin.refreshView();

});


window.onhashchange = function() {
	window.uxpin.setLocation(window.uxpin.getLocation());
};

