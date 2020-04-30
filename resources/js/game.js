var context;
var shape = new Object();
var ghostLocations = [];
var ghostsId = [];
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var keyUp;
var keyDown;
var keyLeft;
var keyRight;
var numBalls;
var numMonsters;
var color5P;
var color15P;
var color25P;
var counter5P;
var counter15P;
var counter25P;
var time;
var playerName;
var life;
var pacmenPicId = [];
var move;

function Start(
  up,
  down,
  left,
  right,
  numOfBalls,
  numOfMonsters,
  color1,
  color2,
  color3,
  totalTime,
  playerUserName
) {
  setup(
    up,
    down,
    left,
    right,
    numOfBalls,
    numOfMonsters,
    color1,
    color2,
    color3,
    totalTime,
    playerUserName
  );
  var cnt = 100;
  var pacman_remain = 1;
  for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 15; j++) {
      if (board[i][j] != 4 && board[i][j] != 9) {
        var randomNum = Math.random();
        if (randomNum <= (1.0 * numBalls) / cnt) {
          var ballPick = getRandomBall();
          updateBallsCounter(ballPick);
          board[i][j] = ballPick;
        } 
        else if (randomNum < (1.0 * (pacman_remain + numBalls)) / cnt) {
          shape.i = i;
          shape.j = j;
          pacman_remain--;
          board[i][j] = 2;
        } else {
          board[i][j] = 0;
        }
        cnt--;
      }
    }
  }
  while (numBalls > 0) {
    var emptyCell = findRandomEmptyCell(board);
    var pickBall = getRandomBall();
    updateBallsCounter(pickBall);
    board[emptyCell[0]][emptyCell[1]] = pickBall;
  }

  keysDown = {};
  addEventListener(
    'keydown',
    function (e) {
      keysDown[e.key] = true;
    },
    false
  );
  addEventListener(
    'keyup',
    function (e) {
      keysDown[e.key] = false;
    },
    false
  );
  interval = setInterval(UpdatePosition, 150);
  setInterval(ghostsUpdatePosition, 500);
}

function setup(
  up,
  down,
  left,
  right,
  numOfBalls,
  numOfMonsters,
  color1,
  color2,
  color3,
  totalTime,
  playerUserName
) {
  context = canvas.getContext('2d');
  time = totalTime;
  numBalls = numOfBalls;
  color5P = color1;
  color15P = color2;
  color25P = color3;
  counter25P = Math.floor(0.1 * numBalls);
  counter15P = Math.floor(0.3 * numBalls);
  counter5P = numBalls - counter25P - counter15P;
  playerName = playerUserName;
  score = 0;
  move = 3;
  pac_color = 'yellow';
  keyUp = up;
  keyDown = down;
  keyLeft = left;
  keyRight = right;
  numMonsters = numOfMonsters;
  life = 5;
  start_time = new Date();
  for (var i = 0; i < numMonsters; i++) {
    ghostLocations[i] = new Object();
  }
  ghostsId = ['redGhost', 'blueGhost', 'orangeGhost', 'pinkGhost'];
  board = initWalls();
  setGhostsOnBoard();
  pacmenPicId = ['pacUp', 'pacDown', 'pacLeft', 'pacRight'];
}

function setGhostsOnBoard() {
  for (var i = 0; i < numMonsters; i++) {
    setGhostLocation(i);
  }
}

function setGhostLocation(ghostNum) {
  var x1;
  var y1;
  switch(ghostNum) {
    case 3:
      x1 = 13;
      y1 = 13;
      break;
    case 2:
      x1 = 13;
      y1 = 1;
      break;
    case 1:
      x1 = 1;
      y1 = 13;
      break;
    case 0:
      x1 = 1;
      y1 = 1;
      break;
  }
  ghostLocations[ghostNum].i = x1;
  ghostLocations[ghostNum].j = y1;
  board[x1][y1] = 9;
}

function updateBallsCounter(ballPick) {
  numBalls--;
  switch (ballPick) {
    case 5:
      counter5P--;
      break;
    case 15:
      counter15P--;
      break;
    case 25:
      counter25P--;
      break;
  }
}

function getRandomBall() {
  var balls = [];
  if (counter5P > 0) {
    balls.push(5);
  }
  if (counter15P > 0) {
    balls.push(15);
  }
  if (counter25P > 0) {
    balls.push(25);
  }

  return balls[Math.floor(Math.random() * balls.length)];
}

function findRandomEmptyCell(board) {
  var i = Math.floor(Math.random() * 14 + 1);
  var j = Math.floor(Math.random() * 14 + 1);
  while (board[i][j] != 0) {
    i = Math.floor(Math.random() * 14 + 1);
    j = Math.floor(Math.random() * 14 + 1);
  }
  return [i, j];
}

function GetKeyPressed() {
  if (keysDown[keyUp]) {
    return 1;
  }
  if (keysDown[keyDown]) {
    return 2;
  }
  if (keysDown[keyLeft]) {
    return 3;
  }
  if (keysDown[keyRight]) {
    return 4;
  }
}

function UpdatePosition() {
  board[shape.i][shape.j] = 0;
  var x = GetKeyPressed();
  if (x == 1) {
    if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
      shape.j--;
      move = 0;
    }
  }
  if (x == 2) {
    if (shape.j < 14 && board[shape.i][shape.j + 1] != 4) {
      shape.j++;
      move = 1;
    }
  }
  if (x == 3) {
    if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
      shape.i--;
      move = 2;
    }
  }
  if (x == 4) {
    if (shape.i < 14 && board[shape.i + 1][shape.j] != 4) {
      shape.i++;
      move = 3;
    }
  }

  updateScore(board[shape.i][shape.j]);

  board[shape.i][shape.j] = 2;
  var currentTime = new Date();
  time_elapsed = (currentTime - start_time) / 1000;
  if (time_elapsed >=  time) {
    gameOver();
  }
  if (score >= 20 && time_elapsed <= 10) {
    pac_color = 'green';
  }
  if (score == 50) {
    window.clearInterval(interval);
    window.alert('Game completed');
  } else {
    Draw();
  }
}

function updateScore(ballType) {
  switch(ballType) {
    case 5:
      score+=5;
      break;
    case 15:
        score+=15;
        break;
    case 25:
      score+=25;
      break;
  }
}

function ghostsUpdatePosition() {
  for (var k = 0; k < ghostLocations.length; k++) {
    board[ghostLocations[k].i][ghostLocations[k].j] = 0;
    getBestMove(k);
  }
}

function getBestMove(k) {
  //max number
  var bestDistance = 0;
  var tmpDistance;
  var tmpLocation;

  //ghost go up
  if (
    ghostLocations[k].j > 0 &&
    board[ghostLocations[k].i][ghostLocations[k].j - 1] != 4 &&
    board[ghostLocations[k].i][ghostLocations[k].j - 1] != 9
  ) {
    tmpDistance = Math.sqrt(
      Math.pow(shape.i - ghostLocations[k].i, 2) +
        Math.pow(shape.j - ghostLocations[k].j - 1, 2)
    );
    if (tmpDistance > bestDistance) {
      bestDistance = tmpDistance;
      tmpLocation = {
        i: ghostLocations[k].i,
        j: ghostLocations[k].j - 1,
      };
    }
  }
  //ghost go down
  if (
    ghostLocations[k].j < 14 &&
    board[ghostLocations[k].i][ghostLocations[k].j + 1] != 4 &&
    board[ghostLocations[k].i][ghostLocations[k].j + 1] != 9
  ) {
    tmpDistance = Math.sqrt(
      Math.pow(shape.i - ghostLocations[k].i, 2) +
        Math.pow(shape.j - ghostLocations[k].j + 1, 2)
    );
    if (tmpDistance > bestDistance) {
      bestDistance = tmpDistance;
      tmpLocation = {
        i: ghostLocations[k].i,
        j: ghostLocations[k].j + 1,
      };
    }
  }

  //ghost go left
  if (
    ghostLocations[k].i > 0 &&
    board[ghostLocations[k].i - 1][ghostLocations[k].j] != 4 &&
    board[ghostLocations[k].i - 1][ghostLocations[k].j] != 9
  ) {
    tmpDistance = Math.sqrt(
      Math.pow(shape.i - ghostLocations[k].i - 1, 2) +
        Math.pow(shape.j - ghostLocations[k].j, 2)
    );
    if (tmpDistance > bestDistance) {
      bestDistance = tmpDistance;
      tmpLocation = {
        i: ghostLocations[k].i - 1,
        j: ghostLocations[k].j,
      };
    }
  }

  //ghost go right
  if (
    ghostLocations[k].i < 14 &&
    board[ghostLocations[k].i + 1][ghostLocations[k].j] != 4 &&
    board[ghostLocations[k].i + 1][ghostLocations[k].j] != 9
  ) {
    tmpDistance = Math.sqrt(
      Math.pow(shape.i - ghostLocations[k].i + 1, 2) +
        Math.pow(shape.j - ghostLocations[k].j, 2)
    );
    if (tmpDistance > bestDistance) {
      bestDistance = tmpDistance;
      tmpLocation = {
        i: ghostLocations[k].i + 1,
        j: ghostLocations[k].j,
      };
    }
  }

  ghostLocations[k].i = tmpLocation.i;
  ghostLocations[k].j = tmpLocation.j;

  //hitting pacmen
  if (board[ghostLocations[k].i][ghostLocations[k].j] == 2) {
    life--;
    score=-10;
    if (life == 0) {
      gameOver();
    }

    else {
      var location = findRandomEmptyCell(board);
      shape.i = location[0];
      shape.j = location[1];
      board[shape.i][shape.j] = 2;
    }
  }

  board[ghostLocations[k].i][ghostLocations[k].j] = 9;
}

function gameOver() {
  alert("Your'e a losser! :( :( :(")
}

function initWalls() {
  var board = [
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    [4, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 4],
    [4, 0, 4, 0, 4, 0, 4, 4, 4, 0, 4, 0, 4, 0, 4],
    [4, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 4, 0, 4],
    [4, 0, 4, 4, 4, 0, 4, 4, 4, 0, 4, 4, 4, 0, 4],
    [4, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 4],
    [4, 0, 0, 0, 4, 0, 4, 4, 4, 0, 4, 0, 0, 0, 4],
    [4, 0, 4, 0, 4, 0, 4, 4, 4, 0, 4, 0, 4, 0, 4],
    [4, 4, 4, 4, 4, 0, 4, 4, 4, 0, 4, 4, 4, 4, 4],
    [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
    [4, 4, 4, 0, 4, 0, 4, 4, 4, 0, 4, 0, 4, 4, 4],
    [4, 0, 0, 0, 4, 0, 0, 4, 0, 0, 4, 0, 0, 0, 4],
    [4, 0, 4, 4, 4, 4, 0, 4, 0, 4, 4, 4, 4, 0, 4],
    [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  ];
  return board;
}
