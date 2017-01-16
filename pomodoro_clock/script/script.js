var status = "Session";
var state = "pause";
var audio = $("audio")[0]; 
var counter, inpTimeChanged, inpBreakChanged, timeArr;

function makeDivided (toChange) {
	var timeArr = [];
	if (toChange < 60) {
		timeArr[1] = toChange;
		timeArr[0] = 0;
	} else {
		timeArr[0] = Math.floor(toChange / 60);
		timeArr[1] = toChange%60;
	}
	timeArr[2] = 0;
	return timeArr;
}

function display(inpArr) {
	var html = "";
	 if (inpArr[0] !== 0) {
	 	if (inpArr[0] < 10 ) {
		 	html += "0" + inpArr[0] + ":";
		 } else {
		 	html +=inpArr[0] + ":";
		 }
	 }
	 if (inpArr[1] < 10 ) {
	 	html += "0" + inpArr[1] + ":";
	 } else {
	 	html +=inpArr[1] + ":";
	 }
	 if (inpArr[2] < 10 ) {
	 	html += "0" + inpArr[2];
	 } else {
	 	html +=inpArr[2];
	 }
	$("#display-timer").text(html);
}

function displayProgres() {
	var timeFull, timePart, percente;
	if (status === "Session") {
		percente = 100 - ((timeArr[0] * 3600 + timeArr[1] * 60 + timeArr[2]) * 100 / (Number($("#session").text()) * 60));
	} else {
		percente = 100 - ((timeArr[0] * 3600 + timeArr[1] * 60 + timeArr[2]) * 100 / (Number($("#break").text()) * 60));
	}
	$("#progress").css("width", percente + "%");
}

function timer() {
	if (timeArr[2] === 1 && timeArr[1] === 0 && timeArr[0] === 0) audio.play();
    if(timeArr[2] > 0 ) timeArr[2]--;
    else{
        timeArr[2] = 59;
         
        if( timeArr[1] > 0 ) timeArr[1]--;
        else{
            timeArr[1] = 59;
             
            if( timeArr[0] > 0 ) timeArr[0]--;
            else {
	        	if (status === "Session") {
					timeArr = inpBreakChanged.slice();
					status = "Break";
					$("#status").text(status);
					setTimeout(function () {
						$("#progress").removeClass("progress-bar-success");
						$("#progress").addClass("progress-bar-danger");
					}, 1000);					
				} else {
					timeArr = inpTimeChanged.slice();
					status = "Session";
					$("#status").text(status);
					setTimeout(function () {
						$("#progress").addClass("progress-bar-success");
						$("#progress").removeClass("progress-bar-danger");
					}, 1000);
				}
            }
        }
    }	
	display(timeArr);
	displayProgres();
}

function breakMinus() {
	if (state === "pause") {
		var breakVar = Number($("#break").text());
		if (breakVar > 1) $("#break").text(breakVar - 1);
		inpBreakChanged = makeDivided(Number($("#break").text()))
		$("#progress").css("width", "0%");
	}
}

function breakPlus() {
	if (state === "pause") {
		var breakVar = Number($("#break").text());
		$("#break").text(breakVar + 1);
		inpBreakChanged = makeDivided(Number($("#break").text()));
		$("#progress").css("width", "0%");
	}
}

function sessionMinus() {
	if (state === "pause") {
		var sessionVar = Number($("#session").text());
		if (sessionVar > 1) $("#session").text(sessionVar - 1);
		inpTimeChanged = makeDivided(Number($("#session").text()));
		timeArr = inpTimeChanged.slice();
		display(inpTimeChanged);
		$("#progress").css("width", "0%");
	}
}

function sessionPlus() {
	if (state === "pause") {
		var sessionVar = Number($("#session").text());
		$("#session").text(sessionVar + 1);
		inpTimeChanged = makeDivided(Number($("#session").text()));
		timeArr = inpTimeChanged.slice();
		display(inpTimeChanged);
		$("#progress").css("width", "0%");
	}
}

function startStop() {
	if (state === "pause") {
		counter = setInterval(timer, 1000);
		state = "continue"
		$("#start-stop").text("Stop");
		$("#start-stop").addClass("btn-danger");
		$("#start-stop").removeClass("btn-success");
	} else {
		clearInterval(counter);
		state = "pause";
		$("#start-stop").text("Start");
		$("#start-stop").removeClass("btn-danger");
		$("#start-stop").addClass("btn-success");
	}
}

function reset() {
	$("#break").text(5);
	$("#session").text(25);
	inpTimeChanged = makeDivided(25);
	inpBreakChanged = makeDivided(5);
	display(inpTimeChanged);
	timeArr = inpTimeChanged.slice();
	status = "Session";
	$("#status").text(status);
	clearInterval(counter);
	state = "pause";
	$("#progress").css("width", "0%");
	$("#start-stop").text("Start");
	if ($("#progress").hasClass("progress-bar-danger")) {	
		setTimeout(function () {
			$("#progress").addClass("progress-bar-success");
			$("#progress").removeClass("progress-bar-danger");
		}, 1000);
	}
	if ($("#start-stop").hasClass("btn-danger")) {
		$("#start-stop").removeClass("btn-danger");
		$("#start-stop").addClass("btn-success");
	}
}

$(document).ready(function() {
	inpTimeChanged = makeDivided(Number($("#session").text()));
	inpBreakChanged = makeDivided(Number($("#break").text()));
	timeArr = inpTimeChanged.slice();
	display(inpTimeChanged);
	$("#status").text(status);
	displayProgres();
	$("#start-stop").text("Start");
	$("#break-minus").click(breakMinus);
	$("#break-plus").click(breakPlus);
	$("#session-minus").click(sessionMinus);
	$("#session-plus").click(sessionPlus);
	$("#start-stop").click(startStop);
	$("#reset").click(reset);
	
})