var strictFlag = false;
var onOffFlag = false;
var canClickFlag = false;
var gameLength = 20;
var gameCounter = 0;
var gameArr = [];
var turnTimerId, playColorsTimerId, blinkHelloTimerId, gameOverTimerId, setLightColorTimerId, setNormalColorTimerId,
musicWinTimerId, timerId1, timerId2, timerId3, timerId4, timerId5, timerId6, timerId7, timerId8, timerId9, timerId10, timerId11;
var canClickStartFlag = true;
var lightColorArr = ["l-green", "l-red", "l-yellow", "l-blue"];
var soundFlag = false;
var oscillator, gainNode;
var frequencies = [110, 330,262,220,165];
var audioContext = new (window.AudioContext || window.webkitAudioContext)();	

function playMelody(freqNum) {
	soundFlag = true;
	oscillator = audioContext.createOscillator();
	oscillator.type = "square";
	oscillator.frequency.value = frequencies[freqNum];
	gainNode = audioContext.createGain();
	gainNode.gain.value = 0.15;
	oscillator.connect(gainNode);
	gainNode.connect(audioContext.destination);
	oscillator.start(0);
};

function stopMelody() {
	if (soundFlag) {
		soundFlag = false;
		oscillator.stop(0);
		oscillator.disconnect();
	}
}

function checkStrict() {
	if (onOffFlag) {
		if (strictFlag === false) {
			strictFlag = true;
			$(".led").addClass("led-red");
		} else {
			strictFlag = false;
			$(".led").removeClass("led-red");
		}
	}
}

function onOff() {
	if (onOffFlag === false) {
		onOffFlag = true;
		canClickStartFlag = true;
		$(".switch-btn").addClass("switcher-on");
		$(".round-btn").addClass("pointer active-btn");
		$(".counter").addClass("counter-work-color");
	} else {
		onOffFlag = false;
		for (var i = 1; i <= 4; i++) {
			makeNormalColor(i, true);
		}
		$(".switch-btn").removeClass("switcher-on");
		$(".round-btn").removeClass("pointer active-btn");
		$(".counter").removeClass("counter-work-color");
		resetAll();
		strictFlag = false;	
		$(".led").removeClass("led-red");
	}
}

function randomNum() {
	return Math.floor(Math.random() * (4 - 1 + 1)) + 1;
}

function makeLightColor(number, sound) {
	$("#id" + (number)).addClass(lightColorArr[number - 1]);
	if (sound) playMelody(number);
}

function makeNormalColor(number, sound) {
	$("#id" + (number)).removeClass(lightColorArr[number - 1]);
	if (sound) stopMelody();
}

function setColor(number, time, sound) {
	setLightColorTimerId = setTimeout(function(){
		makeLightColor(number, sound);
		setNormalColorTimerId = setTimeout(function() {
			makeNormalColor(number, sound);
		}, time)
	}, time);
}

function setCount() {
	if (gameArr.length <= 9) {
		$(".counter").text("0" + gameArr.length);
	} else {
		$(".counter").text(gameArr.length);
	}
}

function blinkCount(time) {
	timerId1 = setTimeout(function() {
		$(".counter").removeClass("counter-work-color");
		timerId2 = setTimeout(function() {
			$(".counter").addClass("counter-work-color");
		}, time);
	}, time);
}

function checkTimer() {
	turnTimerId = setTimeout(function() {
		gameOverOrError();
	}, 3000);
}

function playColors() {
	setColor(gameArr[gameCounter], 700, true);
	playColorsTimerId = setInterval(function(){
		gameCounter++;
		if (gameCounter === gameArr.length) {
			clearInterval(playColorsTimerId);
			gameCounter = 0;
			$(".color-buttons").addClass("clickable");
			canClickFlag = true;
			checkTimer();
		} else {
			setColor(gameArr[gameCounter], 700, true);
		}
	}, 1400);
}

function startHello() {
	var num = 1;
	(function blinkHello(){
		blinkHelloTimerId = setTimeout(function(){
			setColor(num, 70, true);
			blinkCount(70);
			num++;			
			if (num > 4) clearTimeout(blinkHelloTimerId); else blinkHello();
		}, 140);
	})();
}

function resetAll() {
	clearTimeout(turnTimerId);
	clearInterval(playColorsTimerId);
	clearTimeout(blinkHelloTimerId);
	clearInterval(gameOverTimerId);
	clearTimeout(setLightColorTimerId);
	clearTimeout(setNormalColorTimerId);
	clearInterval(musicWinTimerId);
	clearTimeout(timerId1);
	clearTimeout(timerId2);
	clearTimeout(timerId3);
	clearTimeout(timerId4);
	clearTimeout(timerId5);
	clearTimeout(timerId6);
	clearTimeout(timerId7);
	clearTimeout(timerId8);
	clearTimeout(timerId9);
	clearTimeout(timerId10);
	clearTimeout(timerId11);
	gameArr = [];
	gameCounter = 0;
	canClickFlag = false;
	$(".counter").text("--");
	$(".color-buttons").removeClass("clickable");	
	stopMelody();
}

function startGame() {
	if (onOffFlag) {
		if (canClickStartFlag) {
			canClickStartFlag = false;
			$("#start-btn").removeClass("pointer active-btn");
			resetAll();
			startHello();
			timerId3 = setTimeout(function(){
				playGame();
			}, 1000);
			timerId4 = setTimeout(function() {
				canClickStartFlag = true;
				$("#start-btn").addClass("pointer active-btn");
			}, 1800);
		}
	}
}

function playGame() {
	gameCounter = 0;
	gameArr.push(randomNum());		
	playColors();
	setCount();
}

function pressColorButton() {
	var num;
	$(".color-buttons").mousedown(function() {
		if (canClickFlag) {
			var string = $(this).attr("id");
			num = Number(string.charAt(string.length - 1));
			makeLightColor(num, true);
			clearTimeout(turnTimerId);
		}
	});
	$(".color-buttons").mouseup(function() {
		if (canClickFlag) {
			makeNormalColor(num, true);
			checkGame(num);
		}
	});
}

function blinkGameOverOrError(duration) {
	function blinkColors(duration) {
		setColor(1, duration, false);
		setColor(2, duration, false);
		setColor(3, duration, false);
		setColor(4, duration, false);
	}
	blinkColors(duration);
	gameOverTimerId = setInterval(blinkColors, duration * 2, duration);
	timerId5 = setTimeout(function(){
		clearInterval(gameOverTimerId);
		stopMelody();
	},duration * 4);
}

function gameOverOrError() {
	if (strictFlag) {
		playMelody(0);
		$(".color-buttons").removeClass("clickable");
		canClickFlag = false;
		$(".counter").text("GO");
		blinkGameOverOrError(400);
		timerId6 = setTimeout(startGame, 3500);
	} else {
		playMelody(0);
		$(".counter").text("er");
		$(".color-buttons").removeClass("clickable");
		gameCounter = 0;
		canClickFlag = false;
		blinkGameOverOrError(150);
		timerId7 = setTimeout(function(){
			stopMelody();
			playColors();
		}, 800);
		timerId8 = setTimeout(function(){
			setCount();
		}, 1500);	
	}
}

function checkGame(number) {	
	if (gameArr[gameCounter] !== number) {
		//CHECK PLAYER ERROR OR GAMEOVER
		gameOverOrError();
	} else {
		gameCounter++;
		checkTimer();
	}
	if (gameArr.length === gameLength && gameCounter === gameArr.length) {
	//CHECK PLAYER WIN
		$(".color-buttons").removeClass("clickable");
		canClickFlag = false;
		$(".counter").text("WI");
		clearTimeout(turnTimerId);
		musicWinTimerId = setInterval(function() {
			playMelody(2);
			timerId9 = setTimeout(stopMelody, 200);
		}, 400);
		timerId10 = setTimeout(clearInterval, 3000, musicWinTimerId);
		blinkGameOverOrError(400);
		timerId11 = setTimeout(startGame, 3500);
		return ;	
	}	
	//player pressed truthful buttons, play next lever
	if (gameCounter === gameArr.length) {
		gameCounter = 0;
		playGame();
		$(".color-buttons").removeClass("clickable");
		canClickFlag = false;
		clearTimeout(turnTimerId);
	}	
}

$(document).ready(function() {
	$("#strict-mode").click(checkStrict);
	$("#on-off-button").click(onOff);
	$("#start-btn").click(startGame);
	pressColorButton();
})