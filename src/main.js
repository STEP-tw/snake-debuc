let ROWS=60;
let COLS=120;

let game = undefined;
let animator = undefined;

const animateSnake=function() {
  let details = game.move();
  paintBody(details.oldHead);
  unpaintSnake(details.oldTail);
  paintHead(details.head);
  if(game.hasSnakeEatenFood()) {
    game.grow();
    game.increaseScore();
    updateScore(game.getScore());
    game.createFood();
    drawFood(game.getFood());
  }
  if(game.isOver()){
    finishGame(details.oldHead,details.oldTail);
  }
}

const changeSnakeDirection=function(event) {
  let snake = game.getSnake();
  switch (event.code) {
    case "KeyA":
      snake.turnLeft();
      break;
    case "KeyD":
      snake.turnRight();
      break;
    case "KeyC":
      snake.grow();
      break;
    case "KeyR":
        location.reload();
        break;
    default:
  }
}

const addKeyListener=function() {
  let grid=document.getElementById("keys");
  grid.onkeyup=changeSnakeDirection;
  grid.focus();
}

const finishGame=function(oldHead,oldTail) {
  clearInterval(animator);
  if(game.doesSnakeHitWall()){
    paintBody(oldTail);
    paintHead(oldHead);
  }
  displayGameOver();
}

const createGame=function() {
  let topLeft=new Position(0,0,"east");
  let bottomRight=new Position(COLS,ROWS,"east");
  game = new Game(topLeft,bottomRight);
}

const startGame=function() {
  createGame();
  game.addSnake();
  drawGrids(ROWS,COLS);
  drawSnake(game.getSnake());
  game.createFood();
  drawFood(game.getFood());
  updateScore(game.getScore())
  addKeyListener();
  animator=setInterval(animateSnake,100);
}

window.onload=startGame;
