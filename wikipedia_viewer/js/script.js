var urlApi = "https://en.wikipedia.org/w/api.php?action=query&format=jsonfm&prop=extracts&generator=search&exchars=200&exlimit=15&exintro=1&explaintext=1&gsrlimit=15&gsrsearch=";

var wikiPage = "http://en.wikipedia.org/wiki?curid=";

function query() {
	$.ajax({
		url: urlSearch,
		dataType: "jsonp",
		data: {
			format: "json",
		},
		success: function (json) {
			var objects = json.query.pages;
			var html = "";
			for (var key in objects) {
				html += "<a href='" + wikiPage + objects[key].pageid + "' target='_blank'>";
				html += "<div class='item'>";
				html += "<h4 class='item-title'>" + objects[key].title + "</h4>";
				html += "<p class='item-description'>" + objects[key].extract + "</p>";
				html += "</div></a>"; 
			};
			$("#wiki").html(html).slideDown("slow");
			$("footer").removeClass("fixed-footer");
			request = "";
			urlSearch = "";
		}
	});
}

function setQuery (event) {
	request = $("input:first").val();
	urlSearch = urlApi + request;
	$("input:first").val("");
	event.preventDefault();
	$("#wiki").slideUp("slow");
	query();
}

$(document).ready(function() {

	$("form").submit(setQuery);

})
