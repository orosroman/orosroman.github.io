var entry = "0";
var historyVar = "";
var mathOper = "";
var result = new Number(0);

function mathOperFunc (oper) {
	var parseEntry = parseFloat(entry);
	switch (oper) {
		case "+":
			return result + parseEntry;
		case "-":
			return result - parseEntry;
		case "*":
			return result * parseEntry;
		case "/":
			return result / parseEntry;
	}
}

function clear () {
	if (historyVar.search(/=/) !== -1) {
		historyVar = "";
		$("#history").val(historyVar);
		result = 0;
	}
}

function getC () {
	entry = "0";
	$("#entry").text(entry);
	historyVar = "";
	$("#history").val(historyVar);
	mathOper = "";
	result = 0;
}

function getCe () {
	entry = "0";
	$("#entry").text(entry);
	mathOper = "";
	$("#history").val(historyVar + " " + mathOper);
}

function getOperation () {
	if (historyVar.search(/=/) === -1 && entry.charAt(entry.length - 1) !== ".") {
		if (entry === "0") {
			if (historyVar !== "") {
				mathOper = $(this).text();
				$("#history").val(historyVar + " " + mathOper);
			}
		} else {
			if (historyVar === "") {
				result = parseFloat(entry);
				historyVar = entry;			
				mathOper = $(this).text();
				$("#history").val(historyVar + " " + mathOper);
				entry = "0";
				$("#entry").text(entry);
			} else {		
				result = mathOperFunc(mathOper);
				historyVar = historyVar + " " + mathOper + " " + entry;
				mathOper = $(this).text();
				$("#history").val(historyVar + " " + mathOper);
				entry = "0";
				$("#entry").text(entry);
			}
		}
	}
}

function getPointer () {
	clear();
	if (entry.search(/\./) === -1) {
		entry += ".";
		$("#entry").text(entry);
	}
}

function getZero () {
	clear();
	if (entry !== "0") {
		entry += "0";
		$("#entry").text(entry);
	}
}

function getNumber() {
	clear();
	if (entry === "0") {
		entry = $(this).text();
		$("#entry").text(entry);
	} else {
		entry += $(this).text();
		$("#entry").text(entry);
	}	
}

function getEqual () {
	if ((historyVar.search(/=/) === -1) && (historyVar !== "") && (entry !== "0") && (entry.charAt(entry.length - 1) !== ".")) {
		result = mathOperFunc(mathOper);
		historyVar = historyVar + " " + mathOper + " " + entry + " = " + String(result);
		$("#history").val(historyVar);
		entry = String(result);
		$("#entry").text(entry);
		entry = "0";
		mathOper = "";
	}
}

function getPlusMinus () {
	if (historyVar === "" && entry !== "0") {
		if (entry.charAt(0) !== "-") {
			entry = "-" + entry;
			$("#entry").text(entry);
		} else {
			entry = entry.slice(1);
			$("#entry").text(entry);
		}
	}
}

$(document).ready(function() {
	
	$("#entry").text(entry);

	$("#c").click(getC);
	$("#ce").click(getCe);

	$("#divide, #multiply, #minus, #plus").click(getOperation);

	$("#point").click(getPointer);
	$("#zero").click(getZero);

	$("#one, #two, #three, #four, #five, #six, #seven, #eight, #nine").click(getNumber);

	$("#equality").click(getEqual);

	$("#plus-minus").click(getPlusMinus);

})