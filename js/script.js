 $(document).ready(function(){
 	var md = new MobileDetect(navigator.userAgent),grade = md.mobileGrade();
 	window.mobileDetect = md;

	$("#menu, #scroll-up").on("click","a", function (event) {
		event.preventDefault();
		var id  = $(this).attr('href'),
			top = $(id).offset().top;
		$("body,html").animate({scrollTop: top}, 1000);
	});

	$(window).scroll(function(){
		if ($(this).scrollTop() > 100) {
		$(".scrollup").fadeIn();
		} else {
		$(".scrollup").fadeOut();
		}
	});

	new WOW().init();
});

