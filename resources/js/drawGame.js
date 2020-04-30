function Draw() {
  var ghostDraw = 0;
  canvas.width = canvas.width; //clean board
  canvas.style.backgroundColor = 'black';

  lblPlayer.value = playerName;
  lblScore.value = score;
  lblTime.value = time_elapsed;
  lblLife.value = life;
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
      } else if (board[i][j] == 9) {
        drawMonster(center.x, center.y, ghostDraw);
        ghostDraw++;
      } 
    }
  }
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

function drawMonster(centerX, centerY, ghostDraw) {
  var img = document.getElementById(ghostsId[ghostDraw]);
  context.drawImage(img, centerX - 15, centerY - 15);
}

function drawPath(centerX, centerY) {
  context.beginPath();
  context.rect(centerX - 15, centerY - 15, 30, 30);
  context.fillStyle = 'black'; //color
  context.fill();
}
