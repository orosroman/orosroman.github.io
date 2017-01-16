var twUrl = "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=";

var apiUrl = "http://api.forismatic.com/api/1.0/?format=jsonp&method=getQuote&jsonp=?&lang=en";

function getObject (obj) {
	$("#quote").html(" " + obj.quoteText + " ");
	if (obj.quoteAuthor !== "") {
		var author = "- " + obj.quoteAuthor;
	} else {
		author = "- Unknown author";
	}
	$("#author").html(author);
	$("#twitter").attr("href", twUrl + '"' + obj.quoteText + '"' + " " + author);
}

function getQuote () {
	$.getJSON(apiUrl, getObject);
}

getQuote ();

$(document).ready(function() {

	$("#quote-section, footer").fadeIn(2000);

	$("#get-quote").on("click", function() {
		$("#quote-section, footer").fadeOut("slow", function() {
			getQuote ();
			$("#quote-section, footer").fadeIn("slow");
		});
	});
});

