var usersArr = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "Account gogo"];
var html = "";

function url (type, name) {
	return "https://api.twitch.tv/kraken/" + type + "/" + name + "?callback=?&client_id=4lxq78cjqmdi6h0a4d9h8xzc0vwstcu";
}

usersArr.forEach(function (user) {
	$.getJSON(url("streams", user), function (objStream) {
		var game, statusClass;

		if (objStream.stream === null) {
			statusClass = "offline";
			game = "Offline";
		} else if (objStream.stream === undefined) {
			statusClass = "offline";
			game = "Account doesn't exist";
		} else {
			statusClass = "online";
			game = objStream.stream.game + ": ";
		};
		$.getJSON(url("channels", user), function (objChanel) {
			var name, status, logo, url;

			if (objChanel.display_name !== null & objChanel.display_name !==undefined) {
				name = objChanel.display_name
			} else {
				name = user;
			};
			if (objChanel.logo !== null & objChanel.logo !==undefined) {
				logo = objChanel.logo;
			} else if (objChanel.logo === null) {
				logo = "img/nologo.png";
			} else {
				logo = "img/error.png";
			};
			if (objChanel.url !== undefined) {
				url = objChanel.url;
			} else {
				url = "";
			};
			if (statusClass === "online") {
				status = objChanel.status;
			} else {
				status = "";
			};

			html = "<div class='item  " + statusClass + "'>" + 
			"<div class='row'>" + 
			"<div class='col-sm-2 col-xs-3'>" + 
			"<img src='" + logo + "' alt='logo'>" + 
			"</div>" + 
			"<div class='col-sm-3 col-xs-9'>" + 
			"<a href='" + url + "' target='_blank'>" + name + "</a>" + 
			"</div>" +
			"<div class='col-sm-7 col-xs-9'>" + 
			"<p class='game-status'>" + game + status + "</p>" + 
			"</div>" + 
			"</div>" + 
			"</div>";

			if (statusClass === "online") {
				$("main").prepend(html);
			} else {
				$("main").append(html);
			}
		});
	});
})

function online () {
	if ($(".online").hasClass("hidden")) {
		$(".online").removeClass("hidden")
	}
	$(".offline").addClass("hidden");
	$("#status-online").addClass("active");
	if ($("#status-offline").hasClass("active")) {
		$("#status-offline").removeClass("active");
	};
	if ($("#status-all").hasClass("active")) {
		$("#status-all").removeClass("active");
	};
};

function offline () {
	if ($(".offline").hasClass("hidden")) {
		$(".offline").removeClass("hidden")
	}
	$(".online").addClass("hidden");
	$("#status-offline").addClass("active");
	if ($("#status-online").hasClass("active")) {
		$("#status-online").removeClass("active");
	};
	if ($("#status-all").hasClass("active")) {
		$("#status-all").removeClass("active");
	};
};

function all () {
	if ($(".offline").hasClass("hidden")) {
		$(".offline").removeClass("hidden")
	}
	if ($(".online").hasClass("hidden")) {
		$(".online").removeClass("hidden")
	}
	$("#status-all").addClass("active");
	if ($("#status-offline").hasClass("active")) {
		$("#status-offline").removeClass("active");
	};
	if ($("#status-online").hasClass("active")) {
		$("#status-online").removeClass("active");
	};
};

$(document).ready(function() {
	$("#status-all").addClass("active");
	$("#status-online").click(online);
	$("#status-offline").click(offline);
	$("#status-all	").click(all);
})