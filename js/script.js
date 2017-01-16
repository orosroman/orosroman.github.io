 $(document).ready(function(){
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

	$("#form").submit(function() {
		var form_data = $(this).serialize();
		$.ajax({
			type: "POST",
			url: "../send.php",
			data: form_data,
		});
	});
    
});