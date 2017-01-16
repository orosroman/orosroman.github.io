var player, computer, gameOver, compMakeTurn;
var computerScore = 0, playerScore = 0;
var fieldArr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var winCombArr = [
					[0, 1, 2],
					[3, 4, 5],
					[6, 7, 8],
					[0, 4, 8],
					[2, 4, 6],
					[0, 3, 6],
					[1, 4, 7],
					[2, 5, 8]
				];

function checkEmptySquare (squareNum) {
	if (fieldArr[squareNum] === 0) return true; else return false;
}

function setFigure(player, position) {
	if (player === "x") {
		$("#sq" + position).text("x")	
	} else {
		$("#sq" + position).text("o");
	}
}

function checkContainArr (arr1, arr2) {
	var state = true;
	arr1.forEach(function(elem) {
		if (arr2.includes(elem) === false) state = false;
	})
	return state;
}

function checkWin (player, fieldArr) {
	var playerArr = [];
	fieldArr.forEach(function(elem, index) {
		if (elem === player) {
			playerArr.push(index);
		}
	});
	return winCombArr.some(function(elemWin) {
		return checkContainArr(elemWin, playerArr);
	})
}

function changePlayer (player) {
	if (player === "x") return "o"; else return "x";
}

function checkLose (player, fieldArr) {
	return checkWin(changePlayer(player), fieldArr);
}

function checkDraw (fieldArr) {
	if (fieldArr.includes(0)) return false; else return true;
}

function drawWinLine(player, fieldArr) {
	var playerArr = [], winLineArr = [];
	fieldArr.forEach(function(elem, index) {
		if (elem === player) playerArr.push(index);
	});
	winCombArr.some(function(elemWin) {
		if (checkContainArr(elemWin, playerArr)) winLineArr = elemWin.slice();
	});
	winLineArr.forEach(function(elem) {
		$("#sq" + elem).css("background", "red");
	});
}

function minOrMax (player, checkArr) {
	var max = -1, min = 1;
	if (player === computer) return Math.max(...checkArr, max); else return Math.min(...checkArr, min);
}

function artificialIntelligence (player, fieldArrLocal, position) {
	var researchArr = [];
	fieldArrLocal[position] = player;
	if (checkWin(computer, fieldArrLocal)) return 1;
	if (checkDraw(fieldArrLocal)) return 0;
	if (checkLose(computer, fieldArrLocal)) return -1;
	player = changePlayer(player);
	for (var i = 0; i < fieldArrLocal.length; i++) {
		if (fieldArrLocal[i] === 0) {
			var fieldArrLocalCopy = fieldArrLocal.slice();
			researchArr.push(artificialIntelligence(player, fieldArrLocalCopy, i));
		}
	}
	return minOrMax(player, researchArr);
}

function defineCompTurn (computer, fieldArrLocal) {
	if (fieldArrLocal[4] === 0) return 4;

	for (var i = 0; i < fieldArrLocal.length; i++) {
		if (fieldArrLocal[i] === 0) {
			var fieldArrLocalCopy = fieldArrLocal.slice();
			fieldArrLocalCopy[i] = computer;
			if (checkWin(computer, fieldArrLocalCopy)) return i;
			fieldArrLocalCopy[i] = changePlayer(computer);
			if (checkWin(changePlayer(computer), fieldArrLocalCopy)) return i;
		}
	}

	var fieldResearchArr = fieldArrLocal.slice();
	for (var i = 0; i < fieldArrLocal.length; i++) {
		if (fieldArrLocal[i] === 0) {
			var fieldArrLocalCopy = fieldArrLocal.slice();
			fieldResearchArr[i] = artificialIntelligence(computer, fieldArrLocalCopy, i);
		} else {
			fieldResearchArr[i] = -1;
		};
	};
	return fieldResearchArr.indexOf(Math.max(...fieldResearchArr));
}

function makeCompTurn () {
	var compTurn = defineCompTurn(computer, fieldArr);
	fieldArr[compTurn] = computer;
	setTimeout(setFigure, 800, computer, compTurn);
}

function setScore (player) {
	if (player === computer) {
		computerScore += 1;
		$("#computer-score").text("Computer: " + computerScore);
	} else {
		playerScore += 1;
		$("#player-score").text("Player: " + playerScore);
	}
}

function checkGameStatus (player) {
	if (checkWin(player, fieldArr)) {
		gameOver = true;
		drawWinLine(player, fieldArr);
		setScore(player);
		var message;
		if (player === computer) message = "Computer WIN"; else message = "Player WIN";
		showModalAndSetPlayers(message);
		return ;
	};
	if (checkDraw(fieldArr)) {
		gameOver = true;
		showModalAndSetPlayers("It is DRAW");
		return ;
	};
}

function resetGame () {
	fieldArr = [0,0,0,0,0,0,0,0,0];
	$(".square").empty().css("background", "none");
}

function resetAll () {
	playerScore = 0;
	computerScore = 0;
	$("#computer-score").text("Computer: " + computerScore);
	$("#player-score").text("Player: " + playerScore);
	resetGame();
	$("#turn").fadeOut(200);
	$("#message").empty();
	showModalAndSetPlayers();
}

function setdisplayCompTurn() {
	setTimeout(function(){$("#turn").fadeOut(200)}, 750);
	setTimeout(function(){
		if (!gameOver) {
			$("#turn").text("Player turn").fadeIn(200)
		} else {
			$("#turn").fadeOut(200);
		}		
	}, 950);
}

function showModalAndSetPlayers (message) {
	if (message) $("#message").text(message).css("display", "block");
	$("#modalWin").modal({
		backdrop: false,
		keyboard:false
	});
	$("#modalWin button").click(function() {
		player = ($(this).text()).toLowerCase();
		computer = changePlayer(player);
		gameOver = false;
		resetGame();
		game();
		if (player === "o") $("#turn").text("Computer turn").fadeIn(200); else $("#turn").text("Player turn").fadeIn(200);
	})
}

function game () {
	if (computer === "x") {
		compMakeTurn = true;
		makeCompTurn();
		setdisplayCompTurn();
		setTimeout(function(){
			compMakeTurn = false;
		}, 800);
	};
	$(".square").click(function() {
		if (!$("#modalWin").hasClass("in") && !compMakeTurn) {
			var squareNum = ($(this).attr("id")).charAt(2);
			if (checkEmptySquare(squareNum)) {
				fieldArr[squareNum] = player;
				setFigure(player, squareNum);
				checkGameStatus(player);
				if (!gameOver) {
					$("#turn").fadeOut(200);
					setTimeout(function(){
						$("#turn").text("Computer turn").fadeIn(200)
					}, 200);
				} else {
					
				}
				
				if (!gameOver) {
					compMakeTurn = true;
					makeCompTurn();
					setdisplayCompTurn();
					setTimeout(checkGameStatus, 800, computer);
					setTimeout(function(){
						compMakeTurn = false;
					}, 800);			
				};
			};
		};
	});
}

$(document).ready(function() {
	showModalAndSetPlayers();
	$("#reset-but").click(resetAll);
})