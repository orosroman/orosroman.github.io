var geoSupport = navigator.geolocation;
var optionsPossition = {
	enableHighAccurancy: true,
	//timeout: Infinity,
	maximumAge: 0,
};

var apiUrl = "http://api.openweathermap.org/data/2.5/weather?";
var apiKey = "&units=metric&appid=b47c55fd44d3079f6f2ab358ff990e6a";

function succesPosition(position) {
	$("form").fadeOut("slow");
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	var coorUrl = apiUrl + "lat=" + latitude + "&lon=" + longitude + apiKey;
	$.getJSON(coorUrl, getObject);
	$("main, footer").fadeIn(2000);
};

function errorPosition(error) {
	
	switch (error.code) {
		case error.PERMISSION_DENIED:
			//alert("You denied the request for Geolocation. Please, complete area 'Your city'.");
			break;
		case error.POSITION_UNAVAILABLE:
			alert("Your browser can't define your location. Please, complete area 'Your city'.");
			break;
		case error.TIMEOUT:
			alert("The request to get your location timed out. Reload page and try again or complete area 'Your city'.");
			break;
		default:
			alert("An unknown error occurred. Please, complete area 'Your city'.");
	}
};

function getObject (obj) {
	var city = obj.name;

	var country = obj.sys.country

	tempCels = 	Math.round(obj.main.temp);

	var windSpeed = Math.round(obj.wind.speed);

	var description = obj.weather[0].description;

	var humidity = Math.round(obj.main.humidity);

	var iconId = "wi-owm-" + obj.weather[0].id;

	var pressure = Math.round(obj.main.pressure * 0.75);

	var windDeg = "from-" + Math.round(obj.wind.deg) + "-deg";

	$("#city").html(city + ", " + country);
	$("#temp").html(tempCels + " ");
	$("#wind-speed").html(windSpeed + " m/s");
	$("#description").html(description);
	$("#humidity").html(humidity + " %");
	$("#pressure").html(pressure + " mmHg");
	$("#icon").addClass(iconId);
	$("#wind-deg").addClass(windDeg);
}

function getCity (){
	$("form").submit(function (event) {
		var cityInput = $("input").val();
		event.preventDefault();
		$("form").fadeOut("slow");
		var cityUrl = apiUrl + "q=" + cityInput + apiKey;
		$.getJSON(cityUrl, getObject);
		$("main, footer").fadeIn(2000);
		$("input").val("");
	})
}

function changeSystem(){
	if ($(this).hasClass("wi-celsius")) {
		$(this).removeClass("wi-celsius");
		$(this).addClass("wi-fahrenheit");
		$("#temp").html(Math.round(tempCels * 1.8 + 32) + " ");
	} else {
		$(this).removeClass("wi-fahrenheit");
		$(this).addClass("wi-celsius");
		$("#temp").html(tempCels + " ");
	}
}

function formFocus () {
	$(this).css("border-color", "#924da3").fadeIn(1000);
	$("button").css("border-color", "#924da3").fadeIn(1000);
}

function formBlur () {
	$(this).css("border-color", "gray");
	$("button").css("border-color", "gray");
}

if (!geoSupport) {
	//alert("Your browser doesn't support geolocation. Please, complete area 'Your city'.");
} else {
navigator.geolocation.getCurrentPosition(succesPosition, errorPosition, optionsPossition);
};

$(document).ready(function() {

	getCity();

	$("#temp-system").on("click", changeSystem);

	$("input").on("focus", formFocus);
	$("input").on("blur", formBlur);

})



