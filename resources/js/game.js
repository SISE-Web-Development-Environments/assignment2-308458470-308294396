var context;
var lifecontext;
var shape = new Object();
var penguinShape = new Object();
var ghostLocations = [];
var ghostsId = [];
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var ghostInterval;
var penguinInterval;
var candyInterval;
var pizzaInterval;
var keyUp;
var keyDown;
var keyLeft;
var keyRight;
var numBalls;
var totalBalls;
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
var candyId = [];
var mycandy;
var candyLocation = new Object();
var isPenguinAlive;
var isPizzaExists;
var pizzaLocation = new Object();
var isPizzaEaten;

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
  document.getElementById('song').loop = true;
  document.getElementById('song').play();
  drawSettings();

  var keys = {};
  window.addEventListener(
    'keydown',
    function (e) {
      keys[e.keyCode] = true;
      switch (e.keyCode) {
        case 37:
        case 39:
        case 38:
        case 40: // Arrow keys
        case 32:
          e.preventDefault();
          break; // Space
        default:
          break; // do not block other keys
      }
    },
    false
  );
  window.addEventListener(
    'keyup',
    function (e) {
      keys[e.keyCode] = false;
    },
    false
  );

  var cnt = 100;
  var pacman_remain = 1;
  for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 15; j++) {
      if (board[i][j] != 4) {
        var randomNum = Math.random();
        if (randomNum <= (1.0 * numBalls) / cnt) {
          var ballPick = getRandomBall();
          updateBallsCounter(ballPick);
          board[i][j] = ballPick;
        } else if (
          isCellEmpty() &&
          randomNum < (1.0 * (pacman_remain + numBalls)) / cnt
        ) {
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
  interval = setInterval(UpdatePosition, 100);
  ghostInterval = setInterval(ghostsUpdatePosition, 500);
  penguinInterval = setInterval(penguinUpdatePosition, 500);
  candyInterval = setInterval(showCandy, 8000);
  pizzaInterval = setInterval(showPizza, 10000);
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
  lifecontext = canvaslife.getContext('2d');
  time = totalTime;
  totalBalls = numOfBalls;
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
  setPenguinOnBoard();
  pacmenPicId = ['pacUp', 'pacDown', 'pacLeft', 'pacRight'];
  candyId = ['apple', 'cherry', 'strawberry'];
  mycandy = null;
  isPenguinAlive = true;
  isPizzaExists = false;
}

function isCellEmpty(x, y) {
  //check if there is a ghost in the location
  for (var k = 0; k < numMonsters; k++) {
    if (ghostLocations[k].i == x && ghostLocations[k].j == y) {
      return false;
    }
  }

  //check if the penguin in the location
  if (penguinShape.i == x && penguinShape.j == y) {
    return false;
  }

  return true;
}

function showCandy() {
  //there is no candy on board - need to show candy
  if (mycandy == null) {
    mycandy = getRandomCandy();
    var location = findRandomEmptyCell(board);
    candyLocation.i = location[0];
    candyLocation.j = location[1];
    board[candyLocation.i][candyLocation.j] = 30;
  }

  //there is a candy on board - need to disappear candy
  else {
    board[candyLocation.i][candyLocation.j] = 0;
    mycandy = null;
  }
}

function showPizza() {
  //there is no pizza on board - need to show pizza
  if (isPizzaExists == false) {
    var location = findRandomEmptyCell(board);
    pizzaLocation.i = location[0];
    pizzaLocation.j = location[1];
    board[pizzaLocation.i][pizzaLocation.j] = 7;
    isPizzaExists = true;
  }

  //there is a pizza on board - need to disappear pizza
  else {
    board[pizzaLocation.i][pizzaLocation.j] = 0;
    isPizzaExists = false;
  }
}

function getRandomCandy() {
  return candyId[Math.floor(Math.random() * candyId.length)];
}

function setGhostsOnBoard() {
  for (var i = 0; i < numMonsters; i++) {
    setGhostLocation(i);
  }
}

function setGhostLocation(ghostNum) {
  var x1;
  var y1;
  switch (ghostNum) {
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
}

function setPenguinOnBoard() {
  if (isCellEmpty(1, 13)) {
    penguinShape.i = 1;
    penguinShape.j = 13;
  } else if (isCellEmpty(13, 1)) {
    penguinShape.i = 13;
    penguinShape.j = 1;
  } else if (isCellEmpty(13, 13)) {
    penguinShape.i = 13;
    penguinShape.j = 13;
  } else {
    var location = findRandomEmptyCell(board);
    penguinShape.i = location[0];
    penguinShape.j = location[1];
  }
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
  while (board[i][j] != 0 || !isCellEmpty(i, j)) {
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
  if (time_elapsed >= time) {
    if (score >= 100) {
      gameOver('Winner!!!');
    } else {
      gameOver('You are better than ' + score + ' points!');
    }
  } else {
    Draw();
  }
}

function updateScore(ballType) {
  //catch the penguin
  if (
    isPenguinAlive &&
    shape.i == penguinShape.i &&
    shape.j == penguinShape.j
  ) {
    $('.speical').get(0).play();
    score += 50;
    isPenguinAlive = false;
  }

  switch (ballType) {
    case 5:
      score += 5;
      $('.ball').get(0).play();
      break;
    case 15:
      score += 15;
      $('.ball').get(0).play();
      break;
    case 25:
      score += 25;
      $('.ball').get(0).play();
      break;
    case 30:
      $('.fruit').get(0).play();
      score += 30;
      break;
    case 7:
      board[pizzaLocation.i][pizzaLocation.j] = 0;
      $('.life').get(0).play();
      life++;
      break;
  }
}

function ghostsUpdatePosition() {
  for (var k = 0; k < ghostLocations.length; k++) {
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
    isCellEmpty()
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
    isCellEmpty()
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
    isCellEmpty()
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
    isCellEmpty()
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
    board[ghostLocations[k].i][ghostLocations[k].j] = 0;
    life--;
    score -= 10;

    //the player has no life
    if (life == 0) {
      gameOver('Loser!');
    } else {
      var location = findRandomEmptyCell(board);
      shape.i = location[0];
      shape.j = location[1];
      board[shape.i][shape.j] = 2;
      setGhostsOnBoard();
    }
  }
}

function penguinUpdatePosition() {
  if (isPenguinAlive) {
    var movements = getLegalPenguinMove();
    var chosenMove = movements[Math.floor(Math.random() * movements.length)];

    switch (chosenMove) {
      case 0:
        penguinShape.j--;
        break;
      case 1:
        penguinShape.j++;
        break;
      case 2:
        penguinShape.i--;
        break;
      case 3:
        penguinShape.i++;
        break;
    }

    //meet the pacmen
    if (board[penguinShape.i][penguinShape.j] == 2) {
      isPenguinAlive = false;
    }
  }
}

function getLegalPenguinMove() {
  var movements = [];
  //up
  if (
    board[penguinShape.i][penguinShape.j - 1] != 4 &&
    isCellEmpty(penguinShape.i, penguinShape.j - 1)
  ) {
    movements.push(0);
  }
  //down
  if (
    board[penguinShape.i][penguinShape.j + 1] != 4 &&
    isCellEmpty(penguinShape.i, penguinShape.j + 1)
  ) {
    movements.push(1);
  }
  //left
  if (
    board[penguinShape.i - 1][penguinShape.j] != 4 &&
    isCellEmpty(penguinShape.i - 1, penguinShape.j)
  ) {
    movements.push(2);
  }
  //right
  if (
    board[penguinShape.i + 1][penguinShape.j] != 4 &&
    isCellEmpty(penguinShape.i + 1, penguinShape.j)
  ) {
    movements.push(3);
  }

  return movements;
}

function gameOver(message) {
  //pause song
  document.getElementById('song').pause();
  document.getElementById('song').currentTime = 0;

  //clear the window
  window.clearInterval(interval);
  window.clearInterval(ghostInterval);
  window.clearInterval(penguinInterval);
  window.clearInterval(candyInterval);
  window.clearInterval(pizzaInterval);

  var modal = document.getElementById('endGame');
  lblMessage.value = message;
  modal.style.display = 'block';
}

function restartGame() {
  var modal = document.getElementById('endGame');
  modal.style.display = 'none';
  Start(
    keyUp,
    keyDown,
    keyLeft,
    keyRight,
    totalBalls,
    numMonsters,
    color5P,
    color15P,
    color25P,
    time,
    playerUserName
  );
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
