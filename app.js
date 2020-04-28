var context;

var userCounter = 0;

var keyUp;
var keyDown;
var keyLeft;
var keyRight;

$(document).ready(function() {
	createUserDB();
	//showWelcome();
	context = canvas.getContext("2d");
	//Start();
});

function createUserDB() {
	var names = [];
	sessionStorage.setItem("names", JSON.stringify(names));
	var storedNames = JSON.parse(sessionStorage.getItem("names"));
	storedNames[userCounter++]= ({userName:"p", pass: "p"});
	storedNames[userCounter++]= ({userName:"yaarm", pass: "a123456"});
	sessionStorage.setItem("names", JSON.stringify(storedNames));
	//register("p","p");
}


function register(userName, pass) {
	alert("Im in register");
	if (validRegisteration()) {
		var storedNames = JSON.parse(sessionStorage.getItem("names"));
		console.log(storedNames);
		storedNames[userCounter++]= ({userName: userName, pass: pass});
		sessionStorage.setItem("names", JSON.stringify(storedNames));
		alert("The user added");
		showWelcome();
	}
	else {
		alert("Not valid!!");
	}
	//showWelcome();
}

//add function of validate to login page

function checkUserInDB(username, passw) {
	var storedNames = JSON.parse(sessionStorage.getItem("names"));
	let result = storedNames.filter(user => {return user.userName == username && user.pass == passw})
	if (result.length == 1) {
		showSettings();
	}	
}

function startNewGame(numBalls, color1, color2, color3, time, numMonsters) {
	if (validSettings()){
		showGame(keyUp, keyDown, keyLeft, keyRight, numBalls, numMonsters, color1, color2, color3, context);
		Start();
		alert("Start the game");
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
	$(".welcome").show();
	$(".signUp").hide();
	$(".login").hide();
	$(".board").hide();
}

function showSignUp(){
	$(".signUp").show();
	$(".welcome").hide();
	$(".login").hide();
	$(".board").hide();
	$(".about").hide();
}

function showLogin(){
	$(".login").show();
	$(".welcome").hide();
	$(".signUp").hide();
	$(".board").hide();
	$(".about").hide();
}

function showAbout(){
	$(".about").show();
	$(".welcome").hide();
	$(".login").hide();
	$(".signUp").hide();
	$(".board").hide();
}

function showSettings(){
	$(".settings").show();
	$(".about").hide();
	$(".welcome").hide();
	$(".login").hide();
	$(".signUp").hide();
	$(".board").hide();
}

function showGame() {
	$(".welcome").hide();
	$(".signUp").hide();
	$(".login").hide();
	$(".board").show();
	$(".settings").hide();
}

