function Draw() {
  //board
  canvas.width = canvas.width; //clean board
  canvas.style.backgroundColor = 'black';

  //life
  canvaslife.width = canvaslife.width;
	canvaslife.style.backgroundColor = "black";

  lblPlayer.value = playerName;
  lblScore.value = score;
  lblTime.value = time_elapsed;
  drawLife();

  for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 15; j++) {
      var center = new Object();
      center.x = i * 30 + 15;
      center.y = j * 30 + 15;
      if (board[i][j] == 2) {
        drawPacman(center.x, center.y);
      } else if (board[i][j] == 5) {
        drawBalls(center.x, center.y, color5P);
      } else if (board[i][j] == 15) {
        drawBalls(center.x, center.y, color15P);
      } else if (board[i][j] == 25) {
        drawBalls(center.x, center.y, color25P);
      } else if (board[i][j] == 4) {
        drawWalls(center.x, center.y);
      } else if (board[i][j] == 30) {
        drawCandy(center.x, center.y);
      }
    }
  }
  if (isPenguinAlive) {
    drawPenguin();
  }
    drawGhosts();
}

function drawPacman(centerX, centerY) {
  var img = document.getElementById(pacmenPicId[move]);
  context.drawImage(img, centerX - 15, centerY - 15);
}

function drawWalls(centerX, centerY) {
  context.beginPath();
  context.rect(centerX - 15, centerY - 15, 30, 30);
  context.fillStyle = '#000066'; //color
  context.fill();
}

function drawBalls(centerX, centerY, color) {
  context.beginPath();
  context.arc(centerX, centerY, 5, 0, 2 * Math.PI); // circle
  context.fillStyle = color; //color
  context.fill();
}

function drawCandy(centerX, centerY) {
  var img = document.getElementById(mycandy);
  context.drawImage(img, centerX - 15, centerY - 15);
}

function drawGhosts() {
  for (var k = 0; k < numMonsters; k ++) {
    var center = new Object();
    center.x = ghostLocations[k].i * 30;
    center.y = ghostLocations[k].j * 30;
    var img = document.getElementById(ghostsId[k]);
    context.drawImage(img, center.x, center.y);
  }
}

function drawPath(centerX, centerY) {
  context.beginPath();
  context.rect(centerX - 15, centerY - 15, 30, 30);
  context.fillStyle = 'black'; //color
  context.fill();
}

function drawPenguin() {
  var center = new Object();
  center.x = penguinShape.i * 30;
  center.y = penguinShape.j * 30 - 5;
  var img = document.getElementById("penguin");
  context.drawImage(img, center.x, center.y);
}

function drawLife() {
	var img = document.getElementById("lifePacmen");
	var x = 0;
	for (var i = 0; i < life; i++) {
	  lifecontext.drawImage(img, x ,0);
	  x+=30;
	}
}
