(function(){
 "use strict";
 //nav
$("#menu-close").click(function(e) {
	e.preventDefault();
	$("#sidebar-wrapper").toggleClass("active");
});
$("#menu-toggle").click(function(e) {
	e.preventDefault();
	$("#sidebar-wrapper").toggleClass("active");
});
$('a[href*=#]:not([href=#])').click(function() {
  if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
	|| location.hostname == this.hostname) {

	var target = $(this.hash);
	target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	if (target.length) {
	  $('html,body').animate({
		scrollTop: target.offset().top
	  }, 1000);
	  return false;
	}
  }
});


 
 //=========== jquery invew ====================
	$('.hidding').bind('inview', function(event, visible) {
	var effect = $(this).attr('data-animated');
	$(this).addClass(effect);
	$(this).addClass('visible');
	});

 //function
	HeadHeight();
	folioHOver();
	toggleStory();
	valid();

})();
// ===========================================

function HeadHeight(){
var wHeight = $(window).height();
$('.my-header').css('height', wHeight);
}
function folioHOver(){
var animIn = $('.onHover').attr('data-animatedin');
var animInCap = $('.onHoverCap').attr('data-animatedin');
var animOut = $('.onHover').attr('data-animatedout');
var animOutCap = $('.onHoverCap').attr('data-animatedout');
 $('.caption, .main-cap').fadeOut();
$('.hcaption').hover(function(){

	$(this).find('.myToggle').fadeIn();
	$(this).find('.attr-icon, .attr-cap').fadeIn();
    $(this).find('.caption').removeClass(animOut).addClass(animIn);
    $(this).find('.main-cap').removeClass(animOutCap).addClass(animInCap);
    //$(this).find('.right').removeClass('bounceOutRight').addClass('bounceInRight');
    $(this).find('.caption, .main-cap').fadeIn();
    

}, function(){
$(this).find('.myToggle').fadeOut();
//$(this).find('.attr-icon').fadeOut();
    $(this).find('.caption').removeClass(animIn).addClass(animOut);
    $(this).find('.main-cap').removeClass(animInCap).addClass(animOutCap);
 //$(this).find('.right').removeClass('bounceInRight').addClass('bounceOutRight');
    $(this).find('.caption, .main-cap').fadeOut();
});
}

function toggleStory(){
	$('.btn-toggle').click(function(){
		var thisId = $(this).attr('data-toggle');
		
		//$('.story-board').removeClass('show-story');
		$('.story-board').hide();
		//$(thisId).addClass('show-story');
		$(thisId).slideDown();
		return false;
	});
	$('.closed').click(function(){
		//$(this).parents('.story-board').removeClass('show-story');
		$(this).parents('.story-board').fadeOut();
		return false;
	});
}

// function lightboxPhoto() {
    // $(document).delegate('*[data-toggle="lightbox"]', 'click', function(event) {
    // event.preventDefault();
    // $(this).ekkoLightbox();
    // }); 
// }
function valid(){
 $("input.form-control,textarea.form-control").not("[type=submit]").jqBootstrapValidation();
}