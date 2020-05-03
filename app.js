
var userCounter = 0;
var playerUserName
var keyUp;
var keyDown;
var keyLeft;
var keyRight;

$(document).ready(function() {
	createUserDB();
	showWelcome();
});

function createUserDB() {
	var names = [];
	sessionStorage.setItem("names", JSON.stringify(names));
	var storedNames = JSON.parse(sessionStorage.getItem("names"));
	storedNames[userCounter++]= ({userName:"p", pass: "p"});
	sessionStorage.setItem("names", JSON.stringify(storedNames));
}


function register(userName, pass, email, firstName, lastName, dateOfBirth) {
	if (validRegisteration()) {
		var storedNames = JSON.parse(sessionStorage.getItem("names"));
		storedNames[userCounter++]= ({
			userName: userName,
			pass: pass,
			email: email,
			firstName: firstName,
			lastName: lastName,
			dateOfBirth: dateOfBirth
			});
		sessionStorage.setItem("names", JSON.stringify(storedNames));
		showWelcome();
	}
}

function checkUserInDB(username, passw) {
	var isUserFound = false;
	var storedNames = JSON.parse(sessionStorage.getItem("names"));
	let result = storedNames.filter(user => {
	 	if(user.userName == username && user.pass == passw){
			 isUserFound = true;
			 playerUserName = user.userName;
			 showSettings();
		 }
	})

	if(!isUserFound){
		alert("The user name or password are incorrect. Please try again.")
	}
}

function startNewGame(numBalls, color1, color2, color3, time, numMonsters) {
	if (validSettings()){
		showGame();
		Start(keyUp, keyDown, keyLeft, keyRight, numBalls, numMonsters, color1, color2, color3, time, playerUserName);
	}

}

function randomSettings() {
	setDefaultKeys();
	document.getElementById("keyUpPressed").value = "ArrowUp";
	document.getElementById("keyDownPressed").value = "ArrowDown";
	document.getElementById("keyLeftPressed").value = "ArrowLeft";
	document.getElementById("keyRightPressed").value = "ArrowRight";
	document.getElementById("numBalls").value = Math.floor(Math.random() * 40) + 50;
	document.getElementById("time").value = Math.floor(Math.random() * 30) + 60;
	document.getElementById("monsters").value = (Math.floor(Math.random() * 3) + 1).toString();
	document.getElementById("color1").value = "Blue";
	document.getElementById("color2").value = "Red";
	document.getElementById("color3").value = "Green";
}

function setDefaultKeys() {
	keyUp = "ArrowUp";
	keyDown = "ArrowDown";
	keyLeft = "ArrowLeft";
	keyRight = "ArrowRight";
}

function keyPressed(event) {
	var type = event.target;
	switch(type.name) {
		case "keyUp":
			keyUp = event.key;
			document.getElementById("keyUpPressed").value = keyUp;
			break;
		case "keyDown":
			keyDown = event.key;
			$("#keyDown").value = keyDown;
			document.getElementById("keyDownPressed").value = keyDown;
			break;
		case "keyLeft":
			keyLeft = event.key;
			$("#keyLeft").value = keyLeft;
			document.getElementById("keyLeftPressed").value = keyLeft;
			break;
		case "keyRight":
			keyRight = event.key;
			$("#keyRight").value = keyRight;
			document.getElementById("keyRightPressed").value = keyRight;
			break;
	}
}

function showWelcome() {
	$("#welcome").show();
	$("#signUp").hide();
	$("#login").hide();
	$("#settings").hide();
	$("#board").hide();
	$("#about").hide();
	$('#game').hide();
	$('#gameSettings').hide();
	$('#endGame').hide();
}

function showSignUp(){
	$("#signUp").show();
	$("#welcome").hide();
	$("#login").hide();
	$("#settings").hide();
	$("#board").hide();
	$('#game').hide();
	$('#gameSettings').hide();
	$('#endGame').hide();
}

function showLogin(){
	$("#login").show();
	$("#welcome").hide();
	$("#signUp").hide();
	$("#settings").hide();
	$("#board").hide();
	$('#game').hide();
	$('#gameSettings').hide();
	$('#endGame').hide();
}

function showSettings(){
	$("#settings").show();
	$("#welcome").hide();
	$("#login").hide();
	$("#signUp").hide();
	$("#board").hide();
	$('#game').hide();
	$('#gameSettings').hide();
	$('#endGame').hide();
}

function showGame() {
	$('#board').show();
	$('#game').show();
	$('#gameSettings').show();
	$("#welcome").hide();
	$("#signUp").hide();
	$("#login").hide();
	$("#settings").hide();
	$('#endGame').hide();
}


